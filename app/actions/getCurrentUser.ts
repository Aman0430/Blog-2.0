import { authOptions } from "../api/auth/[...nextauth]/route";

import { getServerSession } from "next-auth";
import prisma from "@/app/libs/prismadb"

export async function getSession() {
    return await getServerSession(authOptions)
}

export default async function getCurrUser() {
    try {
        const session = await getSession()
        if (!session?.user?.email) {
            return null
        }

        const currUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        })

        if (!currUser) {
            return null
        }

        return {
            ...currUser,
            createdAt: currUser.createdAt.toISOString(),
            updatedAt: currUser.updatedAt.toISOString(),
            emailVerified: currUser.emailVerified?.toISOString() || null,
        }
    } catch (error: any) {
        return null
    }
}
