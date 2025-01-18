'use client';

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import Avatar from "../Avatar";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";

interface PostItemProps {
    userId?: string,
    data: Record<string, any>
}

const PostItem: React.FC<PostItemProps> = ({ data, userId}) => {
    
    const router = useRouter();
    const loginModal = useLoginModal();

    const { data: currentUser } = useCurrentUser();

    const goToUser = useCallback((event: any) => {
        event.stopPropagation();
        router.push(`/users/${data.user.id}`)
    }, [router, data.user.id]);

    const goToPost = useCallback(() => {
        router.push(`/posts/${data.id}`);
    }, [data.id, router]);

    const onLike = useCallback((event: any) => {
        event.stopPropagation();


        loginModal.onOpen();
    }, [loginModal]);

    const createdAt = useMemo(() => {
        if(!data?.createdAt){
            return null;
        }
        return formatDistanceToNowStrict(new Date(data?.createdAt));
    }, [data?.createdAt])

    return (
        <div
            onClick={goToPost}
            className="border-b-[1px] text-white p-5 border-neutral-800 cursor-pointer hover:bg-neutral-900 transition "
        >
            <div className="flex flex-row items-start gap-3">
                <Avatar userId={data.user.id} />
                <div>
                    <div className="flex flex-row items-center gap-2">
                        <p 
                            onClick={goToUser}
                            className="text-white font-semibold cursor-pointer hover:underline">
                            {data.user.name}
                        </p>
                        <span 
                            onClick={goToUser}
                            className="text-neutral-500 hidden md:block cursor-pointer hover:underline">
                            @{data.user.username}
                        </span>
                        <span className="text-neutral-500 text-sm">
                            {createdAt} ago
                        </span>
                    </div>
                    <div className="text-white mt-1 ">
                        {data.body}
                    </div>
                    <div className="flex flex-row items-center gap-10 mt-4">
                        <div className="flex flex-row items-center transition gap-2 text-neutral-500 hover:text-sky-500">
                            <AiOutlineMessage size={20} />
                            <p>
                                {data.comments.length || 0}
                            </p>
                        </div>
                        <div 
                            onClick={onLike}
                            className="flex flex-row items-center transition gap-2 text-neutral-500 hover:text-red-500">
                            <AiOutlineHeart size={20} />
                            <p>
                                {data.likes || 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostItem;