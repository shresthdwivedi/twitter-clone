'use client';

import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import { HiOutlineBell, HiOutlineUser } from "react-icons/hi";
import { PiHouseBold } from "react-icons/pi";
import { TbLogout2 } from "react-icons/tb";
import SidebarTweet from "./SidebarTweet";
import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";

const Sidebar = () => {

    const { data: currentUser } = useCurrentUser();

    const items = [
        {
            label: 'Home',
            href: '/',
            icon: PiHouseBold,
        },
        {
            label: 'Notificaitons',
            href: '/notificaitons',
            icon: HiOutlineBell,
            auth: true,
        },
        {
            label: 'Profile',
            href: '/users/123',
            icon: HiOutlineUser,
            auth: true,
        },
    ]
    return ( 
        <div className="col-span-1 h-full pr-4 md:pr-6">
            <div className="flex flex-col items-end">
                <div className="space-y-2 lg:w-[230px]">
                    <SidebarLogo />
                    {items.map((item) => (
                        <SidebarItem 
                            key={item.href} 
                            href={item.href}
                            label={item.label}
                            icon={item.icon} 
                            auth={item.auth}
                        />
                    )) }
                    {currentUser && 
                        <SidebarItem onClick={() => signOut()} label="Logout" icon={TbLogout2}/>
                    }
                    <SidebarTweet />
                </div>
            </div>
        </div>
    )
}

export default Sidebar;