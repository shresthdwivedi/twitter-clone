import prisma from "@/lib/db";
import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try{ 
        const currentUser = await serverAuth();
        const { postId } = await req.json();
        if(!postId || typeof postId !== 'string'){
            return NextResponse.json({ error: "Invalid post id" }, { status: 400 });
        }
        if(!('id' in currentUser)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            }
        })

        if(!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        const updatedLikeIds = post.likeIds?.includes(currentUser.id) ? post.likeIds : [...(post.likeIds || []), currentUser.id];

        const updatedPost = await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                likeIds: updatedLikeIds,
            }
        })

        try{
            if(post?.userId) {
                await prisma.notification.create({
                    data: {
                        body: `${currentUser.username} liked your post`,
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

        return NextResponse.json(updatedPost);

    } catch(error) {
        console.error(error);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });  
    }
}

export async function DELETE(req: Request) {
    try{ 
        const currentUser = await serverAuth();
        const { postId } = await req.json();
        if(!postId || typeof postId !== 'string'){
            return NextResponse.json({ error: "Invalid post id" }, { status: 400 });
        }
        if(!('id' in currentUser)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            }
        })

        if(!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        const updatedLikeIds = [...(post.likeIds || [])].filter(likedId => likedId !== currentUser.id)
        const updatedPost = await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                likeIds: updatedLikeIds,
            }
        })
        return NextResponse.json(updatedPost);
        
    } catch(error) {
        console.error(error);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });  
    }
}