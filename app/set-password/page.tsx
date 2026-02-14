"use client";

import { Suspense } from "react";
import SetPasswordContent from "@/components/setpasswordcontent";
export default function SetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SetPasswordContent />
    </Suspense>
  );
}
