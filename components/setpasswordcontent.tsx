"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SetPasswordContent() {
  const searchParams = useSearchParams();
  const gmail = searchParams.get("email");

  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/auth/complete-signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gmail, password }),
    });

    const data = await res.json();
    if (data.success) {
        window.location.href = data.redirectUrl;
    }
    alert(data.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-2">Create Password</h2>
        <p className="text-gray-600 mb-4">Gmail: {gmail}</p>

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
