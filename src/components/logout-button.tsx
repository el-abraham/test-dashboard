import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { useState } from "react";


export default function LogoutButton() {
  const [loading, setLoading] = useState(false)
  const handleLogout = () => {
    setLoading(true)
    signOut().finally(() => setLoading(false))
  }

  return (
    <Button disabled={loading} variant={"ghost"} size={"icon-sm"} onClick={handleLogout}>
      <LogOut className="w-4 h-4" />
    </Button>
  )
}