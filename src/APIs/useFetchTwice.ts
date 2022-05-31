import axios from "axios";
import { useEffect, useReducer } from "react";
import { APIResponse } from "../Interfaces";

const ACTIONS = {
  INIT: "INIT",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

// get employee and projects

export default function useAxiosFetchTwice(
  url: string,
  url2: string,
  initialData: any
): APIResponse {
  const [state, dispatch] = useReducer(
    (state: any, action: { type: any; payload?: any }) => {
      switch (action.type) {
        case "INIT":
          return { ...state, isLoading: true, isError: false };
        case "SUCCESS":
          return {
            ...state,
            isLoading: false,
            isError: false,
            data: action.payload,
          };
        case "ERROR":
          return { ...state, isLoading: false, isError: true };
      }
    },
    {
      isLoading: false,
      isError: false,
      data: initialData,
    }
  );

  useEffect(() => {
    if (!url) {
      return;
    }

    async function fetch() {
      dispatch({ type: ACTIONS.INIT });

      try {
        const a = axios(url);
        const b = axios(url2);

        const result = await Promise.all([a, b]);

        dispatch({
          type: ACTIONS.SUCCESS,
          payload: [result[0].data, result[1].data],
        });
      } catch (error) {
        dispatch({ type: ACTIONS.ERROR });
      }
    }

    fetch();
  }, [url, url2]);

  return state;
}
