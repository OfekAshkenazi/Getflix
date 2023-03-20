import useInfoModal from '@/hooks/useInfoModal'
import { useRouter } from 'next/router'
import { BsFillPlayFill } from 'react-icons/bs'
import { BiChevronDown } from 'react-icons/bi'
import WishlistBtn from './wishlistBtn'


interface MovieCardProps {
    data: Record<string, any>
}

export function MovieCardPreview({ data }: MovieCardProps) {
    const { openModal } = useInfoModal()

    const router = useRouter()

    function handleMobileClick() {
        openModal(data?.id)
    }


    return (
        <article className="group bg-zinc-900 col-span relative h-12/100">

            <img onClick={handleMobileClick} src={data.thumbnailUrl} alt="thumbnail" className="cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-12/100" />
            <p className='text-white text-xs mt-1'>{data?.title}</p>
            <div className="opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible delay-300 w-full scale-0 sm:group-hover:scale-110 group-focus:scale-110 sm:group-hover:-translate-y-4vw group-focus:-translate-y-4vw sm:group-hover:translate-x-2vw group-focus:translate-x-2vw sm:group-hover:opacity-100 group-focus:opacity-100">

                <img src={data.thumbnailUrl} alt="thumbnail"
                    className="cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-12vw" />

                <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">

                    <div className="flex flex-row items-center gap-3">


                        <div onClick={() => router.push(`/watch/${data?.id}`)} className="
                cursor-pointer
                w-6 h-6 lg:w-10 lg:h-10
                bg-white rounded-full
                flex justify-center items-center
                transition hover:bg-neutral-300
              ">

                            <BsFillPlayFill size={30} className="ml-1" />

                        </div>

                        <WishlistBtn movieId={data?.id} />

                        <div className="cursor-pointer ml-auto group/item w-6 h-6 lg:h-10 lg:w-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300" onClick={() => openModal(data?.id)}>

                            <BiChevronDown size={30} className="text-white group-hover/item:text-neutral-300" />

                        </div>

                    </div>

                    <p className='text-green-400 font-semibold mt-4'>New <span className='text-white'>2023</span> </p>

                    <div className="flex flex-row mt-4 gap-2 items-center">
                        <p className='text-white text-xs lg:text-sm'>{data.duration}</p>
                    </div>

                    <div className="flex flex-row mt-4 gap-2 items-center">
                        <p className='text-white text-xs lg:text-sm'>{data.genre}</p>
                    </div>

                </div>

            </div>

        </article>
    )
}