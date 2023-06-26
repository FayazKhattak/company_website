import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../Utils/Api";

const UseFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading("Loading Data .....");
    setData(null);
    setError(null);

    fetchDataFromApi(url)
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        setError("Something went wrong !!!");
      });
  }, [url]);

  return { data, loading, error };
};

export default UseFetch;
