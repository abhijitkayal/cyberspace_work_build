// models/ProductUser.ts

import { Schema } from "mongoose";

export const ProductUserSchema =
  new Schema(
    {
      name: String,
      email: String,
      password: String,
      passwordHash: String,
      phone: String,
     tenantId: {
  type: Schema.Types.ObjectId,
  // ref: "Tenant"
},
      role:String,
      plan: String,
      contractStartDate: Date,
      contractEndDate: Date,
    },
    {
      timestamps: true,
    }
  );