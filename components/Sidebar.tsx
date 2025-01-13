'use client';

import SideBarLogo from "./SideBarLogo";
import SideBarItem from "./SideBarItem";
import { HiOutlineBell, HiOutlineUser } from "react-icons/hi";
import { PiHouseBold } from "react-icons/pi";

const Sidebar = () => {

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
        },
        {
            label: 'Profile',
            href: '/users/123',
            icon: HiOutlineUser,
        },
    ]
    return ( 
        <div className="col-span-1 h-full pr-4 md:pr-6">
            <div className="flex flex-col items-end">
                <div className="space-y-2 lg:w-[230px]">
                    <SideBarLogo />
                    {items.map((item) => (
                        <SideBarItem 
                            key={item.href} 
                            href={item.href}
                            label={item.label}
                            icon={item.icon} 
                        />
                    )) }
                </div>
            </div>
        </div>
    )
}

export default Sidebar;