import BillBoard from '@/components/billboard'
import InfoModal from '@/components/infoModal'
import MovieList from '@/components/movieList'
import Navbar from '@/components/navbar'
import useFavorites from '@/hooks/useFavorites'
import useInfoModal from '@/hooks/useInfoModal'
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
  const { isOpen, closeModal } = useInfoModal()

  const { data: movies = [] } = useMovieList()
  const { data: wishlist = [] } = useFavorites()

  return (
    <section>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <BillBoard />

      <div className="pb-40">
        <MovieList title={"Trending Now"} data={movies} />

        <MovieList title={"My List"} data={wishlist} />
      </div>

    </section>
  )
}
