import { NextApiRequest, NextApiResponse } from "next";
import { without } from 'lodash'
import prismadb from '@/lib/prismadb'
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {

            const { currUser } = await serverAuth(req)
            const { movieId } = req.body
            


            const existMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId
                }
            })

            if (!existMovie) {
                throw new Error('Invaild id')
            }

            const user = await prismadb.user.update({
                where: {
                    email: currUser.email || '',
                },
                data: {
                    favoriteMovies: {
                        push: movieId
                    }
                }
            })

            return res.status(200).json(user)

        }

        if (req.method === 'DELETE') {
            const { currUser } = await serverAuth(req)
            const data = req.body

            const existMovie = await prismadb.movie.findUnique({
                where: {
                    id: data || ''
                }
            })

            if (!existMovie) {
                throw new Error('Invaild id')
            }

            const updatedFavoriteMovies = without(currUser.favoriteMovies, data)

            const updateUser = await prismadb.user.update({
                where: {
                    email: currUser.email || '',
                },
                data: {
                    favoriteMovies: updatedFavoriteMovies
                }
            })
            return res.status(200).json(updateUser)
        }

        return res.status(405).end()

    } catch (err) {
        console.log(err)
        res.status(400).end()
    }
}