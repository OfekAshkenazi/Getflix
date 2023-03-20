import useMovie from "@/hooks/useMovie";
import { useRouter } from "next/router";

import { AiOutlineArrowLeft } from 'react-icons/ai'

export default function Watch() {
    const router = useRouter()
    const { movieId } = router.query

    const { data } = useMovie(movieId as string)

    return (
        <section className="h-screen w-screen bg-black">

            <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
                <AiOutlineArrowLeft className="text-white cursor-pointer" size={35} onClick={() => router.push('/')}/>
                <p className="text-white text-1xl lg:text-3xl font-bold">
                    <span className="font-light">Watching: </span>
                    {data?.title}
                </p>
            </nav>
            <video src={data?.videoUrl} className=" h-full w-full "
            autoPlay
            controls
            ></video>

        </section>
    )
}