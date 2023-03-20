import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import prismadb from '@/lib/prismadb'

export default async function serverAuth(req: NextApiRequest)  {
    const session = await getSession({ req })

    if (!session?.user?.email) {
        throw new Error('Not sigend in')
    }
    const currUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email
        }
    })

    if (!currUser) {
        throw new Error('Not signed in')
    }
    return { currUser }
}