'use client';

import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { FaArrowLeft } from "react-icons/fa6";

interface HeaderProps {
    label: string,
    showBackArrow?: boolean,
}

const Header: React.FC<HeaderProps> = ({
    label,
    showBackArrow,
}) => {
    const router = useRouter();

    const handleBack = useCallback(() => {
        router.back();
    },[router])

    return (
        <div className="border-b-[1px] border-neutral-800 p-6">
            <div className="flex flex-row items-center gap-2">
                { showBackArrow && 
                    <FaArrowLeft 
                        color="white" 
                        size={20}
                        onClick={handleBack}
                        className="cursor-pointer hover:opacity-70 transition" 
                    />
                }
                <h1 className="text-white font-semibold text-xl"> {label} </h1>
            </div>

        </div>
    )
}

export default Header;