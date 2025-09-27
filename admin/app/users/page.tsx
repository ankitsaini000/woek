import { UsersPage } from "@/components/users/UsersPage";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function Users() {
  return (
    <ProtectedRoute>
      <UsersPage />
    </ProtectedRoute>
  );
}
