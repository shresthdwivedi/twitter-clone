'use client';

import useLoginModal from "@/hooks/useLoginModal";
import useUser from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import toast from "react-hot-toast";

interface AvatarProps { 
    userId: string,
    isLarge?: boolean,
    hasBorder?: boolean,
}

const Avatar: React.FC<AvatarProps> = ({
    userId,
    isLarge,
    hasBorder,
}) => {
    const loginModal = useLoginModal();
    const router = useRouter();
    const { data: fetchedUser } = useUser(userId);

    const onClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if(!userId){
            toast.error("User not logged in");
            return loginModal.onOpen();
        }

        const url = `/users/${userId}`
        router.push(url);
    }, [router, userId, loginModal])
    return(
        <div className={`
            ${hasBorder ? 'border-4 border-black' : ''}
            ${isLarge ? 'w-32 h-32' : 'w-12 h-12'}
            rounded-full
            hover:opacity-90
            transition
            cursor-pointer
            relative
        `}>
            <Image 
                fill
                style={{
                    borderRadius: '100%',
                    objectFit: 'cover',
                }}
                onClick={onClick}
                src={fetchedUser?.profileImage || '/images/image.png'}
                alt="avatar"
            />
        </div>
    )
}

export default Avatar;