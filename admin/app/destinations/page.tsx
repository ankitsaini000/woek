import { DestinationsPage } from "@/components/destinations/DestinationsPage";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function Destinations() {
  return (
    <ProtectedRoute>
      <DestinationsPage />
    </ProtectedRoute>
  );
}
