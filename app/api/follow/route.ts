import prisma from "@/lib/db";
import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = await req.json();
        const currentUser = await serverAuth();

        if(!userId || typeof userId !== 'string') {
            return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
        }
        if(!('followingIds' in currentUser)) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            }
        })

        if(!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const updatedFollowingIds = [...(currentUser.followingIds || []), userId];

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                followingIds: updatedFollowingIds,
            }
        })

        try{
            await prisma.notification.create({
                data: {
                    body: `${currentUser.username} followed you!`,
                    userId,
                }
            })
            await prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    hasNotification: true,
                }
            })
        } catch (error) {
            console.error(error);
        }
        
        return NextResponse.json(updatedUser);

    } catch(error) {
        console.error(error);
        return NextResponse.json(null, {status: 400})        
    }
}

export async function DELETE(req: Request) {
    try {
        const { userId } = await req.json();
        const currentUser  = await serverAuth();

        if(!userId || typeof userId !== 'string') {
            throw new Error('Invalid user id');
        }

        if (!("followingIds" in currentUser)) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            }
        })

        if(!user) {
            throw new Error('User not found');
        }

        const updatedFollowingIds = [...(currentUser?.followingIds || [])].filter(followingId => followingId !== userId);

        if(!('id' in currentUser)){
            return NextResponse.json(null, {status: 401})
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                followingIds: updatedFollowingIds,
            }
        })

        return NextResponse.json(updatedUser);

    } catch(error) {
        console.error(error);
        return NextResponse.json(null, { status: 400})
    }
}