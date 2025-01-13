'use client';

import { useRouter } from "next/navigation";
import { PiFeatherBold } from "react-icons/pi";

const SidebarTweet = () => {
    const router = useRouter();
    
    return (
        <div onClick={() => {router.push('/')}}>
            <div className="mt-6 bg-sky-500 h-14 p-4 transition rounded-full flex items-center justify-center lg:hidden cursor-pointer hover:bg-opacity-80">
                <PiFeatherBold color="white" size={28} />
            </div>
            <div className="mt-6 bg-sky-500 transition px-4 py-2 rounded-full justify-center hidden items-center lg:block cursor-pointer hover:bg-opacity-90"> 
                <p className="lg:block hidden text-white text-center text-[20px] font-semibold">
                    Tweet
                </p>
            </div>
        </div>
    )
}

export default SidebarTweet;