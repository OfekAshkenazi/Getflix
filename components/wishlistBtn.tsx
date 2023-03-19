import axios from "axios";
import React, { useCallback, useMemo } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { AiOutlineCheck } from 'react-icons/ai'
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";

interface WishListProps {
    movieId: string
}

export default function WishlistBtn({ movieId }: WishListProps) {

    const { mutate: mutateWishlist } = useFavorites()
    const { data: currUser, mutate } = useCurrentUser()

    const isInWishList = useMemo(() => {
        const list = currUser?.favoriteMovies || []
        return list.includes(movieId)
    }, [currUser, movieId])



    async function toggleWishlist() {
        let res

        if (isInWishList) {
            res = await axios.delete('/api/wishlist', {data:movieId} )
        } else {
            res = await axios.post('/api/wishlist', { movieId })

        }
        const updatedWishlist = res?.data?.favoriteMovies

        mutate({
            ...currUser,
            favoriteMovies: updatedWishlist
        })

        mutateWishlist()
    }



    const Icon = isInWishList ? AiOutlineCheck : AiOutlinePlus

    return (
        <div className=" cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex items-center justify-center transition hover:border-neutral-300" onClick={toggleWishlist}>
            <Icon className="text-white" size={25} />
        </div>
    )
}



// const toggleWishlist = useCallback(async () => {
//     let res
//     if (isInWishList) {
//         res = await axios.delete('/api/wishlist', { data: movieId })
//     } else {
//         res = await axios.post('/api/wishlist', { movieId })

//     }
//     const updatedWishlist = res?.data?.favoriteMovies

//     mutate({
//         ...currUser,
//         favoriteMovies: updatedWishlist
//     })

//     mutateWishlist()
// }, [movieId, isInWishList, currUser, mutate, mutateWishlist])
