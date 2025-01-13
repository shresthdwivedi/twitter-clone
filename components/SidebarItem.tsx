'use client';

import { IconType } from "react-icons";

interface SideBarItemsProps {
    label: string,
    href?: string,
    icon: IconType,
    onClick?: () => void
}

const SidebarItem: React.FC<SideBarItemsProps> = ({
    label,
    href,
    icon: Icon,
    onClick
}) => {

    return (
        <div className="flex flex-row items-center">
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