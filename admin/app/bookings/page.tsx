import { BookingsPage } from "@/components/bookings/BookingsPage";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function Bookings() {
  return (
    <ProtectedRoute>
      <BookingsPage />
    </ProtectedRoute>
  );
}
