'use client'
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import googleImage from "@/../public/google.png"
import Image from "next/image";
import { useState } from "react";


export default function LoginWithGoogleButton() {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    signIn("google").finally(() => {
      setLoading(false)
    })
  }

  return (
    <Button disabled={loading} variant="outline" className="w-full" onClick={handleClick}>
      <Image src={googleImage} alt="Google Logo" width={20} height={20} />
      Login with Google
    </Button>
  )
}