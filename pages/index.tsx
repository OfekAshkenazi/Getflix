import BillBoard from '@/components/billboard'
import MovieList from '@/components/movieList'
import Navbar from '@/components/navbar'
import useMovieList from '@/hooks/useMovieList'
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

  const { data: movies = [] } = useMovieList()

  return (
    <section>
      <Navbar />
      <BillBoard />

      <div className="pb-40">
        <MovieList title={"Trending now"} data={movies} />
      </div>

    </section>
  )
}
