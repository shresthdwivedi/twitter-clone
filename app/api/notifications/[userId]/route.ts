import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ userId: string }> }) {

    try {
        const { userId } = await params;

        if(!userId || typeof userId !== 'string'){
            return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
        }

        const notifications = await prisma.notification.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                createdAt: 'desc',
            }
        })

        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                hasNotification: false,
            }
        })

        return NextResponse.json(notifications);
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
} 