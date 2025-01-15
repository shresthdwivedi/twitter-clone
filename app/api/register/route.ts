import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/db";

export async function POST(req: Request) {
    try{
        const { email, name, username, password } = await req.json();

        const hashedPassword = await bcrypt.hash(password, 12); 
        const user = await prisma.user.create({
            data: {
                email,
                name,
                username,
                hashedPassword,
            }

        })
        return NextResponse.json(user);
    }
    catch(error){
        console.error(error);
        return NextResponse.json(null, {status: 400})
    }
}