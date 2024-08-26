'use client'

import LogoutButton from "@/components/logout-button";
import { ModeToggle } from "@/components/mode-toggle";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div>
        <nav className="w-full h-14 flex justify-between items-center shadow p-4">
          <div className="font-semibold">
            Test APP
          </div>
          <div className="flex items-center space-x-2">
            <ModeToggle />
            <LogoutButton />
          </div>
        </nav>
        {children}

      </div>
    </>
  )
}