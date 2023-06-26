import { useEffect } from "react"
import { fetchDataFromApi } from "./Utils/Api"
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration,  getGenres } from "./Store/homeSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// components and pages 
import Header from './Components/header/Header';
import Footer from './Components/footer/Footer';
import Home from './Pages/home/Home';
import ErrorPage from "./Pages/404/ErrorPage";
import Details from './Pages/details/Details';
import SearchResult from './Pages/searchResult/SearchResult';
import Explore from './Pages/explore/Explore';

const App = () => {
  const { url } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  console.log(url)


  useEffect(() => {
    fetchApiConfig()
    genresCall()
  }, [])

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      console.log(res)
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    })
  }

  const genresCall = async () => {
    let promises = []
    let endPoints = ["tv", "movie"]
    let allGenres = {}

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    })

    const data = await Promise.all(promises);
    // console.log(data)
    data.map(({ genres }) => {
      return genres.map((item) => allGenres[item.id] = item);
    })
    
    dispatch(getGenres(allGenres));
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );

}

export default App
