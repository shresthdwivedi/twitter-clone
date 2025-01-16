import prisma from "@/lib/db";
import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request){
    try{
        const currentUser = await serverAuth();
        const { name, username, bio, profileImage, coverImage } = await req.json()

        if(!('id' in currentUser)){
            return NextResponse.json(null, {status: 401})
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                name,
                username,
                bio,
                profileImage,
                coverImage,
            }
        })

        return NextResponse.json(updatedUser)
    }
    catch(error){
        console.error(error);
        return NextResponse.json(null, {status: 400})
    }
}

