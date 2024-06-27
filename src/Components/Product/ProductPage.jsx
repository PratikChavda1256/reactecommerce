

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../Actions/Product';
import ProductCard from './ProductCart';
import Loading from '../Loader/Loading';


const ProductPage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts()); 
  }, [dispatch]);

  if (loading) {
    return  <Loading/>
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
