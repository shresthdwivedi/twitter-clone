import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ postId: string }>}) {
    try {
        const { postId } = await params;
        if(!postId || typeof postId !== 'string') {
            return NextResponse.json({ error: "Invalid post id" }, { status: 400 });
        }
        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
            include: {
                user: true,
                comments: {
                    include: {
                        user: true,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    }
                }
            }
        })

        return NextResponse.json(post);
    } catch(error) {
        console.error(error);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}
