import { NextResponse } from "next/server";
import {connectToDatabase} from "@/lib/mongodb";
import SoftwareClient from "../../../lib/models/SoftwareClient";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();
    console.log("Received body:", body);

    const client = await SoftwareClient.create({
      name: body.name,
      email: body.email,
      password: body.password,
      phone: body.phone,

      softwareId: body.softwareId,
      softwareName: body.softwareName,

      plan: body.plan,
      tenure: body.tenure,
      source: body.source,

      contractStartDate: body.contractStartDate,
      contractEndDate: body.contractEndDate,
      notes: body.notes,
    });
    console.log(client);

    const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: body.email,
  subject: `Welcome to ${body.softwareName}`,
  html: `
    <h2>Hello ${body.name}</h2>

    <p>Your account has been created successfully.</p>

    <table border="1" cellpadding="8" cellspacing="0">
      <tr>
        <td><strong>Software</strong></td>
        <td>${body.softwareName}</td>
      </tr>

      <tr>
        <td><strong>Email</strong></td>
        <td>${body.email}</td>
      </tr>

      <tr>
        <td><strong>Password</strong></td>
        <td>${body.password}</td>
      </tr>

      <tr>
        <td><strong>Plan</strong></td>
        <td>${body.plan}</td>
      </tr>

      <tr>
        <td><strong>Tenure</strong></td>
        <td>${body.tenure}</td>
      </tr>
    </table>

    <br/>

    <p>Thank you for choosing ${body.softwareName}.</p>
  `,
});

    return NextResponse.json({
      success: true,
      client,
      message: "Client added successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();

    const clients = await SoftwareClient.find().sort({
      createdAt: -1,
    });

    const now = new Date();

    const currentWeek = new Date();
    currentWeek.setDate(now.getDate() - 7);

    const previousWeek = new Date();
    previousWeek.setDate(now.getDate() - 14);

    // Current week
    const currentWeekClients = clients.filter(
      (c) => new Date(c.createdAt) >= currentWeek
    );

    // Previous week
    const previousWeekClients = clients.filter(
      (c) =>
        new Date(c.createdAt) >= previousWeek &&
        new Date(c.createdAt) < currentWeek
    );

    const totalOrders = clients.length;

    const basicOrders = clients.filter(
      (c) => c.plan === "Basic"
    ).length;

    const businessOrders = clients.filter(
      (c) => c.plan === "Business"
    ).length;

    const enterpriseOrders = clients.filter(
      (c) => c.plan === "Enterprise"
    ).length;

    const currentOrders = currentWeekClients.length;
    const previousOrders = previousWeekClients.length;

    const orderGrowth =
      previousOrders === 0
        ? 100
        : (
            ((currentOrders - previousOrders) /
              previousOrders) *
            100
          ).toFixed(1);

    const currentBasic = currentWeekClients.filter(
      (c) => c.plan === "Basic"
    ).length;

    const previousBasic = previousWeekClients.filter(
      (c) => c.plan === "Basic"
    ).length;

    const basicGrowth =
      previousBasic === 0
        ? 100
        : (
            ((currentBasic - previousBasic) /
              previousBasic) *
            100
          ).toFixed(1);

    const currentBusiness = currentWeekClients.filter(
      (c) => c.plan === "Business"
    ).length;

    const previousBusiness = previousWeekClients.filter(
      (c) => c.plan === "Business"
    ).length;

    const businessGrowth =
      previousBusiness === 0
        ? 100
        : (
            ((currentBusiness -
              previousBusiness) /
              previousBusiness) *
            100
          ).toFixed(1);

    const currentEnterprise =
      currentWeekClients.filter(
        (c) => c.plan === "Enterprise"
      ).length;

    const previousEnterprise =
      previousWeekClients.filter(
        (c) => c.plan === "Enterprise"
      ).length;

    const enterpriseGrowth =
      previousEnterprise === 0
        ? 100
        : (
            ((currentEnterprise -
              previousEnterprise) /
              previousEnterprise) *
            100
          ).toFixed(1);

    return NextResponse.json({
      success: true,

      clients,

      totalOrders,

      basicOrders,
      businessOrders,
      enterpriseOrders,

      orderGrowth,
      basicGrowth,
      businessGrowth,
      enterpriseGrowth,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}