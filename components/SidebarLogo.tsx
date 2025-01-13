'use client';

import { useRouter } from "next/navigation";
import { FaXTwitter } from "react-icons/fa6";



const SidebarLogo = () => {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push("/")} 
            className="rounded-md cursor-pointer h-14 w-14 flex items-center justify-center p-4">
            <FaXTwitter size={28} color="white" />
        </div>
    )
}

export default SidebarLogo;