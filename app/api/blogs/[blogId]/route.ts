import getCurrUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";

interface IParams {
    blogId?: string
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrUser()

    if (!currentUser) {
        return NextResponse.error()
    }

    const { blogId } = params

    if (!blogId || typeof blogId !== 'string') {
        throw new Error('Invalid Id')
    }

    const blog = await prisma.blog.deleteMany({
        where: {
            id: blogId,
            userId: currentUser.id
        }
    })

    return NextResponse.json(blog)
}

export async function PUT(request: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrUser()
    const body = await request.json()

    if (!currentUser) {
        return NextResponse.error()
    }
    const { blogId } = params

    if (!blogId || typeof blogId !== 'string') {
        throw new Error('Invalid Id')
    }

    const updated = await prisma.blog.update({
        where: {
            id: blogId
        },
        data: body
    })

    return NextResponse.json(updated)
}
