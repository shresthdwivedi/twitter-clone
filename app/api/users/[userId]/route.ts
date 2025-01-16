import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ userId: string}>}) {
    try{
        const { userId } = await params;
        
        if(!userId){
            throw new Error("Sign in to view user details");
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                id: userId,
            }
        })
        
        if(!existingUser){
            throw new Error("User not found");
        }

        const followersCount = await prisma.user.count({
            where: {
                followingIds: {
                    has: userId
                }
            }
        })
        const { hashedPassword, ...safeUser } = existingUser;
        
        return NextResponse.json({ ...safeUser, followersCount });
    }
    catch(error) {
        console.error(error);
        return NextResponse.json(null, {status: 400})
    }
}