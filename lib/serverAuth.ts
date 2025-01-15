import { getServerSession } from "next-auth"
import { authOptions } from "./authOptions"
import prisma from "./db";

const serverAuth = async () => {
    const session = await getServerSession(authOptions);

    if(!session?.user?.email){
        throw new Error('Not signed in');
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        }
    })
    if(!currentUser){
        return {error: 'User not found'};
    }
    return currentUser;
}

export default serverAuth;