import prisma from "@/lib/db";
import serverAuth from "@/lib/serverAuth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const currentUser = await serverAuth();
        const { body } = await req.json();
        const searchParams = req.nextUrl.searchParams;
        const postId = searchParams.get('postId');

        if(!postId || typeof postId !== 'string') {
            return NextResponse.json({ status: 400 });
        }

        if(!('id' in currentUser)) {
            return NextResponse.json({ status: 401 });
        }
        const comment = await prisma.comment.create({
            data: {
                body, 
                userId: currentUser.id,
                postId,
            }
        });

        try{
            const post = await prisma.post.findUnique({
                where: {
                    id: postId,
                },
            })

            if(post?.userId) {
                await prisma.notification.create({
                    data: {
                        body: `${currentUser.username} replied to your post`,
                        userId: post.userId,
                    }
                })
                await prisma.user.update({
                    where: {
                        id: post.userId,
                    },
                    data: {
                        hasNotification: true,
                    }
                })
            }
        } catch (error) {
            console.error(error);
        }

        return NextResponse.json(comment);
    } catch(error) {
        console.error(error);
        return NextResponse.json({ status: 500 });
    }
}