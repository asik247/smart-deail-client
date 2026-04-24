import React, { use } from 'react';
import Products from './Products';

const LatestProducts = ({ fetchPromiseLatestProducts }) => {
    const productsLatest = use(fetchPromiseLatestProducts);
    // console.log(productsLatest);
    return (
        <div>
            <h2 className='text-2xl font-bold text-center mb-5'>Latst Product({productsLatest.length})</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    productsLatest.map(product => <Products key={product._id} product={product}></Products>)
                }
            </div>
        </div>
    );
};

export default LatestProducts;