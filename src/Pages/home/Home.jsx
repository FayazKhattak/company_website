import HeroBanner from './homeBanner/HeroBanner'
import './homeStyle.scss'
import Popular from './popular/Popular'
import TopRated from './top Rated/TopRated'
import Trending from './trending/Trending'

const Home = () => {
  return (
    <div className="home">
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
      <div className="" style={{height: 1500}}></div>
    </div>
  )
}

export default Home