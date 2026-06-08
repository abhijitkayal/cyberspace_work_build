"use client";

import Image from "next/image";
import { useState,useEffect } from "react";
import { Heart, Minus, Plus, ZoomIn, CheckCircle } from "lucide-react";
import { useSession } from "next-auth/react";

export default function ProductDetail({ product }: { product: any }) {
  const [color, setColor] = useState("black");
  const [qty, setQty] = useState(1);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [wishlistDB, setWishlistDB] = useState<any[]>([]);

  const [currentUser, setCurrentUser] = useState<any>(null);
   const { data: session } = useSession();

useEffect(() => {
  const loadUser = async () => {
    const res = await fetch("/api/auth/me");
    const data = await res.json();

    if (data.success) {
      setCurrentUser(data.user);
    }
  };

  loadUser();
}, []);
const user1 =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user") || "null")
    : null;
const userId =
  (session?.user as any)?.id ||
  user1?.id ||
  currentUser?.id;

  // const getStoredUser = () => {
  //   if (typeof window === "undefined") {
  //     return null;
  //   }

  //   const storedUser =
  //     localStorage.getItem("loggedInUser") || localStorage.getItem("user");

  //   return storedUser ? JSON.parse(storedUser) : null;
  // };

 useEffect(() => {
  const loadWishlist = async () => {
    if (!userId) return;

    const res = await fetch(
      `/api/wishlist/toggle?userId=${userId}`
    );

    const data = await res.json();

    console.log("wishlist loaded", data);

    if (data.success) {
      setWishlistDB(data.wishlist);
    }
  };

  loadWishlist();
}, [userId]);
useEffect(() => {
  const loadCart = async () => {
    if (!userId) return;

    const res = await fetch(`/api/cart?userId=${userId}`);
    const data = await res.json();

    if (data.success) {
      setCartItems(data.cart);
    }
  };

  loadCart();
}, [userId]); // <-- runs before currentUser is loaded
const isInCart = cartItems.some(
  (item) =>
    String(item.productId) === String(product._id)
);
const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");

    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};
const removeFromCart = async () => {
  const user = currentUser;
  console.log("currentUser in removeFromCart:", user);

  if (!userId) return;

  const res = await fetch("/api/cart", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      productId: product._id,
    }),
  });

  const data = await res.json();
  console.log("removeFromCart response:", data);

  if (data.success) {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          String(item.productId) !== String(product._id)
      )
    );
  }
};
const isWishlisted = wishlistDB.some(
  (item) =>
    String(item.productId) === String(product._id) &&
    item.isActive
);
const toggleWishlist = async (product: any) => {
  const user = currentUser;


console.log("product", product);
  const res = await fetch("/api/wishlist/toggle", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      productId: product.id,
      productName: product.title,
      productPrice: product.price,
    }),
  });

  const data = await res.json();

  if (data.success) {
    setWishlistDB((prev) => {
      const exists = prev.find(
        (item) => item.productId === product.id
      );

      if (exists) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, isActive: !item.isActive }
            : item
        );
      }

      return [...prev, data.wishlist];
    });
  }
};
const addToCart = async () => {
  const user = currentUser;


  const res = await fetch("/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      productId: product._id,
      productName: product.title,
      productPrice: product.discountPrice,
      quantity: qty,
    }),
  });
  const data = await res.json();

 if (data.success) {
  setCartItems((prev) => [
    ...prev,
    {
      productId: product._id,
      quantity: qty,
    },
  ]);
}
};
const handlePurchase = async () => {
  const res = await loadRazorpay();

  if (!res) {
    alert("Razorpay SDK failed to load");
    return;
  }

  const orderRes = await fetch(
    "/api/payment/create-order",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: product.discountPrice,
      }),
    }
  );

  const order = await orderRes.json();

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

    amount: order.amount,

    currency: order.currency,

    order_id: order.id,

    name: "CyberSpaceWorks",

    description: product.title,

 handler: async function (response: any) {
const user = currentUser;

  console.log("storedUser:", user);

  // const user = storedUser
  //   ? JSON.parse(storedUser)
  //   : null;

  console.log("user:", user);

  const verifyRes = await fetch(
    "/api/payment/verify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...response,
        user,
        product,
      }),
    }
  );

  console.log(await verifyRes.json());
},
  };

  const paymentObject = new (window as any).Razorpay(
    options
  );

  paymentObject.open();
};


  const colors = [
    { id: "black", hex: "#111111" },
    { id: "white", hex: "#FFFFFF" },
  ];

  const stars = Array.from({ length: 5 });

  return (
    <div className="min-h-screen bg-gray-900 text-white mt-10">
      {/* <div className="h-[3px] w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400" /> */}

      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row gap-12">

        {/* IMAGE */}
        <div className="md:w-1/2 w-full">
          <div className="relative rounded-2xl overflow-hidden aspect-square group">
            <Image
              src={product.image}
              alt={product.title}
              width={520}
              height={520}
              className="object-contain p-10 group-hover:scale-105 transition"
            />
          </div>
        </div>

        {/* DETAILS */}
        <div className="md:w-1/2 w-full flex flex-col mt-10 gap-5">

          <h1 className="text-3xl font-bold">{product.title}</h1>

          {/* PRICE */}
          {/* PRICE */}
<div>
  <span className="line-through text-white/30 mr-2">
    ₹{product.actualPrice}
  </span>

  <span className="text-2xl font-bold">
    {product.discountPrice === 0 ? (
      <span className="text-green-400">Free</span>
    ) : (
      <>₹{product.discountPrice}</>
    )}
  </span>
  
</div>
   <a
  href={product.demoLink}
  target="_blank"
  rel="noopener noreferrer"
  onClick={(e) => e.stopPropagation()}
  className="text-cyan-400 hover:text-cyan-300 text-sm underline break-all"
>
  Live Demo →
</a>
          <p className="text-white/60 text-sm">
            {product.shortDescription}
          </p>

          <div className="flex gap-3 mt-3 ">
            
            <button
  onClick={handlePurchase}
  className="bg-blue-600 px-5 py-2 rounded-full"
>
  Purchase Now
</button>

           <button
  className={`px-5 py-2 rounded-full ${
    isInCart
      ? "bg-red-600 text-white"
      : "border border-white"
  }`}
  onClick={isInCart ? removeFromCart : addToCart}
>
  {isInCart ? "Remove from Cart" : "Add to Cart"}
</button>

            <button
 onClick={() =>
  toggleWishlist({
    id: product._id,
    title: product.title,
    price: product.discountPrice,
  })
}
  className={`border p-3 rounded-full transition ${
    isWishlisted
      ? "border-red-500 text-red-500"
      : "border-white text-white"
  }`}
>
  <Heart
    fill={isWishlisted ? "currentColor" : "none"}
    size={20}
  />
</button>
          </div>

          <p className="text-white/50 text-sm">
            {product.longDescription}
          </p>

        </div>
      </div>
    </div>
  );
}