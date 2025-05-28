import { useClerk } from "@clerk/clerk-react";

export default function LogoutButton() {
  const { signOut } = useClerk();

  const handleLogout = () => {
    signOut(); // Logs out the user
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}
