import React from 'react';
import { Button } from '@mui/material';
import ProductForm from '../components/ProductForm';
import Base from '../components/Base';

const EditProduct = () => {
  return (
    <Base title="Edit Product" description="Edit your product and necessary information">

        <div className="rounded-2xl bg-white py-5 px-8 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="text-black text-start">
            <p className='text-sm underline underline-offset-14 pb-3 decoration-4 decoration-blue-700'>BASIC INFO</p>
            <hr/>
            
            <ProductForm />

<div className='mt12 mb-4 col-span-8 grid grid-cols-12 gap-10'>
<div className="mt-12 mb-4 col-span-12 md:col-span-5 grid grid-cols-12 gap-4">
  <div className="col-span-12 md:col-span-6">
    <Button variant="outlined" size="small" sx={{ color:"#006096", borderColor: "#006096" }} className="w-full">
      Cancel
    </Button>
  </div>
  <div className="col-span-12 md:col-span-6">
    <Button variant="contained" size="small" sx={{ bgcolor:"#006096" }} className="w-full">
      UPDATE PRODUCT
    </Button>
  </div>
</div>

<div className="mt-12 mb-4 col-span-12 md:col-span-7 grid grid-cols-12 gap-4">
    <div className="col-span-12 md:col-span-6">
        <Button variant="outlined" size="small" sx={{ color:"#FF0000", borderColor: "#FF0000", "&:hover": {
      borderColor: "#FF0000",
    }, }} className="w-full">
            Delete
        </Button>
    </div>
</div>
</div>
          </div>
        </div>    
    </Base>
  );
};

export default EditProduct;
