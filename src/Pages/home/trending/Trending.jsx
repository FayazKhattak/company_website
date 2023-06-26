import { useState } from 'react'
import ContentWrapper from '../../../Components/contentWrapper/ContentWrapper'
import SwitchTab from '../../../Components/switchTab/SwitchTab'
import UseFetch from '../../../hooks/useFetch'
import Carousel from '../../../Components/carousel/Carousel'

const Trending = () => {

  const [endpoint, setEndPoint] = useState('day')
  const { data, loading } = UseFetch(`/trending/all/${endpoint}`);

  const onTabChange = (tab) => {
    setEndPoint(tab === "Day" ? "day" : "week")
  }

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTab data = {['Day' , "Week"]} onTabChange ={ onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} />
    </div>
  )
}

export default Trending