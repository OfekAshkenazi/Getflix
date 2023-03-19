import { NextApiRequest, NextApiResponse } from "next";

import prismadb from '@/lib/prismadb'
import serverAuth from "@/lib/serverAuth";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'GET') {
            return res.status(405).end()
        }

        const { currUser } = await serverAuth(req)

        const favoriteMovies = await prismadb.movie.findMany({
            where: {
                id: {
                    in: currUser?.favoriteMovies
                }
            }
        })

        return res.status(200).json(favoriteMovies)
    } catch (err) {
        console.log(err)
        return res.status(400).end()
    }
}