import { useEffect, useState } from "react";
import axios from "axios";
import { APIResponse } from "../Interfaces";


interface IFetch {
  data: any,
  loading: boolean,
  error: any
}

export default function useFetch(url: string): IFetch {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}
