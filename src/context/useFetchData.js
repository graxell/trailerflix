import axios from "axios";
import { useEffect, useState } from "react";

const useFetchData = (url) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setIsLoading(true);
    try {
      axios.get(url).then((response) => {
        setData(response.data.results);
      });
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [url]);
  return { data, isLoading, error };
};

export default useFetchData;
