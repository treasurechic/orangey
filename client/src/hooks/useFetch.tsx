import { useEffect, useState } from "react";

const API_KEY = process.env.REACT_APP_GIPHY_API;

export const useFetch = ({ query }: { query: string }) => {
  const [giphUrl, setGiphUrl] = useState("");

  const fetchGifs = async () => {
    if (query) {
      try {
        const res = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query
            .split(" ")
            .join("")}&limit=1`
        );
        const { data } = await res.json();
        if (!data[0]) {
          const res = await fetch(
            `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=blockchain&limit=1`
          );
          const { data } = await res.json();
          setGiphUrl(data[0].images?.downsized_medium?.url);
        } else {
          setGiphUrl(data[0].images?.downsized_medium?.url);
        }
      } catch (error) {
        console.error(error);
        setGiphUrl(
          "https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284"
        );
      }
    }
  };

  useEffect(() => {
    if (query) fetchGifs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return giphUrl;
};
