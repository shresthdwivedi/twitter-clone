'use client';

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface SideBarItemsProps {
    label: string,
    href?: string,
    icon: IconType,
    onClick?: () => void,
    auth?: boolean,
}

const SidebarItem: React.FC<SideBarItemsProps> = ({
    label,
    href,
    icon: Icon,
    onClick,
    auth,
}) => {
    const { data: currentUser } = useCurrentUser();
    const loginModal = useLoginModal();
    const router = useRouter();
    const handleClick = useCallback(() => {
        if(onClick){
            return onClick();
        }
        if(auth && !currentUser){
            loginModal.onOpen();
        } else if(href){
            router.push(href);        
        }
    }, [router, onClick, href]) 

    return (
        <div onClick={handleClick} className="flex flex-row items-center">
            <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer transition lg:hidden">
                <Icon size={28} color="white" />
            </div> 
            <div className="relative hidden rounded-full items-center gap-4 p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:flex transition">
                <Icon size={28} color="white" />
                <p className="lg:block hidden text-white text-lg font-semibold">
                    {label}
                </p>
            </div> 
        </div>
    )
}

export default SidebarItem;