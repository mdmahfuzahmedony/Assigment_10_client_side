import React from 'react';
import { useLoaderData } from 'react-router';
import ProductCard from '../Component/ProductCard';

const BrowseCars = () => {

  const cardata = useLoaderData()
  console.log(cardata);

  return (
   <div className="max-w-[1400px] mx-auto mt-30">
      <div className="grid grid-cols-5 gap-6">
        {
          cardata?.map(data => <ProductCard key={data._id} car={data}></ProductCard>)
        }
      </div>
    </div>
  );
};

export default BrowseCars; 