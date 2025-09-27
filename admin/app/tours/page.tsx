import { ToursPage } from "@/components/tours/ToursPage";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function Tours() {
  return (
    <ProtectedRoute>
      <ToursPage />
    </ProtectedRoute>
  );
}
