'useClient';

import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import { format } from "date-fns";
import React, { useMemo } from "react";
import Button from "../Button";
import { PiCalendarDots } from "react-icons/pi";
import useEditModal from "@/hooks/useEditModal";
import useFollow from "@/hooks/useFollow";

interface UserBioProps {
    userId: string,
}

const UserBio: React.FC<UserBioProps> = ({
    userId
}) => {
    const { data: currentUser } = useCurrentUser();
    const { data: fetchedUser } = useUser(userId)
    const editModal = useEditModal();

    const { isFollowing, toggleFollow } = useFollow(userId)

    const createdAt = useMemo(() => {
        if(!fetchedUser?.createdAt){
            return null;
        }
        return format(new Date(fetchedUser.createdAt), 'MMMM yyyy')
    }, [fetchedUser?.createdAt])
    return (
        <div className="border-[1px] border-neutral-800 p-2">
            <div className="flex justify-end p-2 ">
                {
                    currentUser?.id === userId ? (
                        <Button secondary label="Edit" onClick={editModal.onOpen}/>
                    ) : (
                        <Button secondary={!isFollowing} outline={isFollowing} label={isFollowing ? 'Unfollow' : 'Follow'} onClick={toggleFollow}/>
                    )
                }
            </div>
            <div className="mt-4 px-4">
                <div className="flex flex-col">
                    <p className="text-2xl text-white font-semibold">
                        {fetchedUser?.name}
                    </p>
                    <p className="text-base text-neutral-500">
                        @{fetchedUser?.username}
                    </p>
                </div>
                <div className="flex flex-col mt-4">
                    <p className="text-white font-semibold">
                        {fetchedUser?.bio}
                    </p>
                </div>
                <div className="flex flex-row items-center gap-2 text-neutral-500 mt-2">
                    <PiCalendarDots size={24} />
                    <p>
                        Joined {createdAt}
                    </p>
                </div>
            </div>
            <div className="flex flex-row items-center gap-4 mt-4 p-2">
                <div className="flex flex-row items-center gap-1 ">
                    <p className="text-white font-semibold">
                        {fetchedUser?.followingIds?.length || 0}
                    </p>
                    <p className="text-neutral-500">
                        Following
                    </p>
                </div>
                <div className="flex flex-row items-center gap-1">
                    <p className="text-white font-semibold">
                        {fetchedUser?.followerCount || 0} 
                    </p>
                    <p className="text-neutral-500">
                        Followers
                    </p>
                </div>
            </div>
        </div>
    )
}

export default UserBio;