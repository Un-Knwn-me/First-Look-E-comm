import React from 'react';
import Base from './Base';
import { Button, Grid } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const AddProduct = () => {

  return (
    <Base title="Add Products" description="Add your product and necessary information">

        <div className="rounded-2xl bg-white py-5 px-8 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="text-black text-start">
            <p className='text-sm underline underline-offset-14 pb-3 decoration-4 decoration-blue-700'>BASIC INFO</p>
            <hr/>
            
            <Grid container spacing={6}>
                <Grid item xs={12} sm={12} md={5} sx={{ mt: 2 }}>
                <div className="col-span-12">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Product Name
              </label>
              <div className="mt-1">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Product name"
                  />
                </div>
              </div>
            </div>

<div className="col-span-8 grid grid-cols-12 gap-4 mt-3">
  <div className="col-span-8">
    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
      Brand Name
    </label>
    <div className="mt-1">
      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
        <input
          type="text"
          name="brandName"
          id="brandName"
          autoComplete="brandName"
          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="Brand name"
        />
      </div>
    </div>
  </div>
  <div className="col-span-4">
    <label htmlFor="anotherField" className="block text-sm font-medium leading-6 text-gray-900">
      SKU
    </label>
    <div className="mt-1">
      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
        <input
          type="text"
          name="sku"
          id="sku"
          autoComplete="sku"
          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="#SKU"
        />
      </div>
    </div>
  </div>
</div>

<div className="col-span-8 grid grid-cols-12 gap-4 mt-3">
  <div className="col-span-6">
    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
      Category
    </label>
    <div className="mt-1">
        <select
            id="country"
            name="country"
            autoComplete="country-name"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        >
            <option>Select</option>
            <option>T-shirts</option>
            <option>Shirt</option>
            <option>Pant</option>
        </select>
    </div>
  </div>
  <div className="col-span-6">
    <label htmlFor="anotherField" className="block text-sm font-medium leading-6 text-gray-900">
      Product Type
    </label>
    <div className="mt-1">
      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
        <input
          type="text"
          name="type"
          id="type"
          autoComplete="type"
          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="Product Type"
        />
      </div>
    </div>
  </div>
</div>

<div className="col-span-8 grid grid-cols-12 gap-4 mt-3">
  <div className="col-span-6">
    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
      Size
    </label>
    <div className="mt-1">
        <select
            id="size"
            name="size"
            autoComplete="size"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        >
            <option>Select</option>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
        </select>
    </div>
  </div>
  <div className="col-span-6">
    <label htmlFor="anotherField" className="block text-sm font-medium leading-6 text-gray-900">
      Color
    </label>
    <div className="mt-1">
      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
      <select
            id="color"
            name="color"
            autoComplete="color"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        >
            <option>Select</option>
            <option>Black</option>
            <option>White</option>
            <option>Blue</option>
            <option>Red</option>
        </select>
      </div>
    </div>
  </div>
</div>

<div className="col-span-8 grid grid-cols-12 gap-4 mt-3">
  <div className="col-span-6">
    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
      Price
    </label>
    <div className="mt-1">
      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
        <input
          type="text"
          name="price"
          id="price"
          autoComplete="price"
          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="Price"
        />
      </div>
    </div>
  </div>
  <div className="col-span-6">
    <label htmlFor="anotherField" className="block text-sm font-medium leading-6 text-gray-900">
      Sales Price
    </label>
    <div className="mt-1">
      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
        <input
          type="text"
          name="salesPrice"
          id="salesPrice"
          autoComplete="salesPrice"
          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="Sales Price"
        />
      </div>
    </div>
  </div>
</div>

<div className="col-span-8 grid grid-cols-12 gap-4 mt-3">
  <div className="col-span-6">
    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
      Tag
    </label>
    <div className="mt-1">
        <select
            id="tag"
            name="tag"
            autoComplete="tag"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        >
            <option>Select tag</option>
            <option>Best Selling</option>
            <option>Featured</option>
            <option>Offer</option>
        </select>
    </div>
  </div>
  <div className="col-span-6">
    <label htmlFor="anotherField" className="block text-sm font-medium leading-6 text-gray-900">
      Stock Quantity
    </label>
    <div className="mt-1">
      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
        <input
          type="text"
          name="stock"
          id="stock"
          autoComplete="stock"
          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="Stock Count"
        />
        <span className="flex select-none items-center pr-3 text-gray-500 sm:text-sm">/Pcs</span>
      </div>
    </div>
  </div>
</div>

<div className="col-span-8 grid grid-cols-12 gap-4 mt-3">
  <div className="col-span-6">
    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
      Fabric
    </label>
    <div className="mt-1">
      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
        <input
          type="text"
          name="fabric"
          id="fabric"
          autoComplete="fabric"
          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="Fabric"
        />
      </div>
    </div>
  </div>
  <div className="col-span-6">
    <label htmlFor="anotherField" className="block text-sm font-medium leading-6 text-gray-900">
      Style
    </label>
    <div className="mt-1">
      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
        <input
          type="text"
          name="style"
          id="style"
          autoComplete="style"
          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="Style"
        />
      </div>
    </div>
  </div>
</div>

<div className="mt-12 mb-4 col-span-8 grid grid-cols-12 gap-4">
  <div className="col-span-6">
    <Button variant="outlined" size="small" className="w-full">
      Cancel
    </Button>
  </div>
  <div className="col-span-6" style={{ alignItems: "center" }}>
    <Button variant="contained" size="small" className="w-full">
      PUBLISH PRODUCT
    </Button>
  </div>
</div>


                </Grid>

            <Grid item xs={12} sm={12} md={7} sx={{ mt: 2 }}>

            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Add images
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <CloudUploadIcon className="mx-auto text-gray-300" aria-hidden="true" sx={{ height: "40px", width: "40px" }} />
                  <div className="mt-1 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload files</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG up to 10MB</p>
                </div>
              </div>
            </div>

            <div className="col-span-full mt-5">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder='Type here..'
                />
              </div>
            </div>

            <div className="col-span-full mt-3">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Notes
              </label>
              <div className="mt-1">
                <textarea
                  id="note"
                  name="note"
                  rows={2}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder='Type here..'
                />
              </div>
            </div>

            </Grid>
        
            </Grid>

          </div>
        </div>    
    </Base>
  );
};

export default AddProduct;
