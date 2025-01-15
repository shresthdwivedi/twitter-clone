'use client';

import useUser from "@/hooks/useUser";
import Image from "next/image";
import React from "react";
import Avatar from "../Avatar";

interface UserHeroProps {
    userId: string,
}

const UserHero: React.FC<UserHeroProps> = ({
    userId
}) => {
    const { data: fetchedUser } = useUser(userId);
    return (
        <div className="bg-neutral-700 h-44 relative"> 
            {fetchedUser?.coverImage && (
                <Image fill src={fetchedUser.coverImage} alt="cover-image" style={{objectFit: 'cover'}}/>
            )}
            <div className="absolute -bottom-16 left-4">
                <Avatar userId={userId} isLarge hasBorder />
            </div>
        </div>
    )
}

export default UserHero;