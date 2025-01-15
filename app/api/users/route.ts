import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
        return NextResponse.json(users);
    } 
    catch(error) {
        console.error(error);
        return NextResponse.json(null, {status: 400})
    }
}