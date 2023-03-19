import useCurrentUser from '@/hooks/useCurrentUser'
import { NextPageContext } from 'next'
import { getSession, signOut } from 'next-auth/react'

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

export default function Home() {

  const { data: user } = useCurrentUser()

  return (
    <section>
      <h2 className="text-4xl text-green-500">Netflix clone</h2>
      <p className='text-white'>Logged in as : {user?.email}</p>
      <button onClick={() => signOut()}
        className="h-10 w-full bg-white"

      >Logout</button>
    </section>
  )
}
