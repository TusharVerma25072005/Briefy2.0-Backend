"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SetPasswordContent() {
  const searchParams = useSearchParams();
  const mail = searchParams.get("email");
  const provider = searchParams.get("provider");
  const photo = searchParams.get("photo");
  const name = searchParams.get("name");
  const [password, setPassword] = useState("");

  let imageSrc = "";
  if (photo) {
    if (provider === "gmail") {

      imageSrc = photo
    } else if (provider === "outlook") {
      imageSrc = `data:image/jpeg;base64,${photo}`;
    }
  }

  const handleSubmit = async () => {
    const res = await fetch("/api/auth/complete-signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mail, password }),
    });

    const data = await res.json();
    if (data.success) {
      window.location.href = data.redirectUrl;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-2">Create / Update Password</h2>
        <span className="flex items-center justify-center">
          {imageSrc && (
            <img
              src={imageSrc}
              alt="Profile Photo"
              width={96}
              height={96}
              className="rounded-full mb-4"
            />
          )}
        </span>
        <p className="flex items-center justify-center text-gray-600 mb-4 font-semibold">{mail}</p>

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-4 py-3 rounded mb-4"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded"
        >
          Complete Signup
        </button>
      </div>
    </div>
  );
}
