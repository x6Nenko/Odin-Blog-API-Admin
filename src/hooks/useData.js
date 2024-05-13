import { useState, useEffect } from 'react';

function useData(url, refetchData) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let ignore = false;

    if (url) {
      fetch(url, { headers: {Authorization: "Bearer " + localStorage.getItem("token")} })
        .then(response => response.json())
        .then(json => {
          if (!ignore) {
            setData(json);
          }
        });

      return () => {
        ignore = true;
      };
    }
  }, [url, refetchData]);

  return data;
}

export default useData;
