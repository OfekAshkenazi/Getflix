import useCurrentUser from '@/hooks/useCurrentUser'
import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context)

    if (!session) return {
        redirect: {
            destination: '/auth',
            permanent: false,
        }
    }

    return {
        props: {}
    }
}

export default function Profiles() {
    const { data: user } = useCurrentUser()

    const router = useRouter()



    return (
        <section className='flex items-center h-full justify-center'>

            <div className="flex flex-col ">

                <h1 className='text-3xl md:text-6xl text-white text-center'>Who is watching?</h1>

                <div className="flex items-center justify-center gap-8 mt-10">

                    <article onClick={() => router.push('/')}>

                        <div className="group flex-row w-44 mx-auto">

                            <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                                <img src="/imgs/default-green.png" alt="account" />
                            </div>

                            <h2 className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">{user?.name}</h2>

                        </div>

                    </article>

                </div>

            </div>

        </section>
    )
}