import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'

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
    return (
        <section>
            <p className="text-white text-4xl">Profiels</p>
        </section>
    )
}