import getCurrUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const currentUser = await getCurrUser()

    if (!currentUser) {
        return null
    }

    const body = await request.json()
    const { name, description, imageSrc } = body

    const blog = await prisma.blog.create({
        data: {
            name,
            imageSrc,
            description,
            userId: currentUser.id
        }
    })

    return NextResponse.json(blog)
}
