import BillBoard from '@/components/billboard'
import Navbar from '@/components/navbar'
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

export default function Home() {

  return (
    <section>
      <Navbar />
      <BillBoard />
    </section>
  )
}
