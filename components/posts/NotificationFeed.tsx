'use client';

import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";
import { useEffect } from "react";
import { FaXTwitter } from "react-icons/fa6";

const NotificationFeed = () => {

    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
    const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);
    
    useEffect(() => {
        if(currentUser){
            mutateCurrentUser();
        }
    }, [mutateCurrentUser, currentUser]);
    
    if(fetchedNotifications.length === 0) {
        return (
            <div className="text-neutral-600 text-center p-6 text-xl">
                No Notifications
            </div>
        )
    }
    
    if (!currentUser) {
        return (
            <div className="text-neutral-600 text-center p-6 text-xl">
                Loading notifications...
            </div>
        );
    }
    

    return (
        <div className="flex flex-col">
            {fetchedNotifications.map((notification: Record<string, any>) => (
                <div 
                    key={notification.id}
                    className="border-b-[1px] border-neutral-800 flex flex-row gap-4 p-6 items-center">
                    <FaXTwitter size={28} color="white" />
                    <p className="text-white">
                        {notification.body}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default NotificationFeed;