import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import FollowBar from "@/components/layout/FollowBar";
import RegisterModal from "@/components/modals/RegisterModal";
import LoginModal from "@/components/modals/LoginModal";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
import EditModal from "@/components/modals/EditModals";


export const metadata: Metadata = {
  title: "Twitter Clone",
  description: "By Shresth Dwivedi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
        <Toaster />
        <EditModal />
        <LoginModal />
        <RegisterModal />
        <div className="bg-black h-screen">
          <div className="container h-screen mx-auto xl:px-30 max-w-6xl">
            <div className="grid grid-cols-4 h-screen"> 
              <Sidebar />
              <div className="col-span-3 lg:col-span-2 h-screen border-x-[1px] border-neutral-800 ">
                {children}
              </div>
              <FollowBar />
            </div>
          </div>
        </div>
        </Providers>
      </body>
    </html>
  );
}
