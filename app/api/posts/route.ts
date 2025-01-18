import prisma from "@/lib/db";
import serverAuth from "@/lib/serverAuth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
    try{
        const currentUser = await serverAuth();
        const { body } = await req.json();

        if(!('id' in currentUser)){
            return NextResponse.json(null, {status: 401})
        }

        const post = await prisma.post.create({
            data: {
                body,
                userId: currentUser.id,
            }
        })

        return NextResponse.json(post);
    }
    catch(error){
        console.error(error);
        return NextResponse.json(null, { status: 400})
    }
}

export async function GET(req: NextRequest) {
    try{
        const searchParams = req.nextUrl.searchParams;
        const userId = searchParams.get('userId');

        const posts = await prisma.post.findMany({
            where: userId ? { userId } : undefined,
            include: {
                user: true,
                comments: true,
            },
            orderBy: {
                createdAt: 'desc',
            }
        })

        return NextResponse.json(posts);
    }
    catch(error){
        console.error(error);
        return NextResponse.json(null, { status: 400});
    }
}