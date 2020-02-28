import React from 'react';
import useAxios from 'axios-hooks'

const Catalog = () => {
  const [{ loading, error, data }, refetch] = useAxios({
    url: 'http://localhost:5000/api/v1/ebay',
    method: 'get',
    params: {
      maxPrice: 100.00,
      minPrice: 90.00,
      keywords: 'wheels'
    }
  });

  return (<p>Catalog</p>);
}

export default Catalog;