import Header from "@/components/Header";
import NotificationFeed from "@/components/posts/NotificationFeed";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function NotificationsPage() {
    const session = await getServerSession(authOptions);
    if(!session){
        redirect('/');
    }

    return (
        <>
            <Header showBackArrow label="Notifications" />
            <NotificationFeed />
        </>
    )
    
}