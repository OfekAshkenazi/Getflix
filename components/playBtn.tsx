import { BsFillPlayFill } from 'react-icons/bs'
import { useRouter } from 'next/router'

interface PlayBtnProps {
    movieId: string
}

export default function PlayBtn({ movieId }: PlayBtnProps) {

    const router = useRouter()

    return (
        <button className=" bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition" onClick={() => router.push(`/watch/${movieId}`)}>
            <BsFillPlayFill size={25} />
            Play
        </button>
    )
}