"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PackagesPage } from "@/components/packages/PackagesPage";

export default function Packages() {
  return (
    <ProtectedRoute>
      <PackagesPage />
    </ProtectedRoute>
  );
}
