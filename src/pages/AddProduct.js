import React, { useRef, useState } from "react";
import { Button, Grid } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import Base from "../components/Base";
import axios from "axios";
import { Backend_URL } from "../App";
import { useNavigate } from "react-router-dom";
import { IconButton, Input, Typography } from "@material-tailwind/react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { toast } from "react-toastify";

const AddProduct = () => {
  const form = useRef();
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [salesPrice, setSalesPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [category, setCategory] = useState("");
  const [productType, setProductType] = useState("");
  const [color, setColor] = useState("");
  const [tag, setTag] = useState("");
  const [fabric, setFabric] = useState("");
  const [style, setStyle] = useState("");
  const [notes, setNotes] = useState("");
  const [yLink, setYLink] = useState("");
  const [care, setCare] = useState("");
  const [varients, setVarients] = useState([{ size: "", stock : null }])

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedImages = Array.from(e.dataTransfer.files);
    setImages([...images, ...droppedImages]);
  };

  const handleFileChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages([...images, ...selectedImages]);
  };

  const handleRemove = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("productName", productName);
      formData.append("brandName", brandName);
      formData.append("sku", sku);
      formData.append("price", price);
      formData.append("salesPrice", salesPrice);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("productType", productType);
      formData.append("color", color);
      formData.append("tag", tag);
      formData.append("fabric", fabric);
      formData.append("style", style);
      formData.append("notes", notes);
      formData.append("yLink", yLink);
      formData.append("care", care);

      formData.append('varients', JSON.stringify(varients));
      console.log(varients)


      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      const response = await axios.post(
        `${Backend_URL}/admin/product/add`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        navigate("/product-management");
        toast.success(response.data.message);
      } else {
        toast.warning(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  let handleChange = (i, e) => {
    let newVarients = [...varients];
    newVarients[i][e.target.name] = e.target.name === 'stock' ? parseInt(e.target.value, 10) : e.target.value;
    setVarients(newVarients);
  };  

  let addFormFields = () => {
    setVarients([...varients, { size: "", stock: 0 }]);
  };  

let removeFormFields = (i) => {
  let newFormValues = [...varients];
  newFormValues.splice(i, 1);
  setVarients(newFormValues)
}

  return (
    <Base
      title="Add Products"
      description="Add your product and necessary information"
    >
      <div className="rounded-2xl bg-white py-5 px-8 shadow-lg backdrop-blur-md max-sm:px-8">
        <div className="text-black text-start">
          <p className="text-sm underline underline-offset-14 pb-3 decoration-4 decoration-blue-700">
            BASIC INFO
          </p>
          <hr />
          <form
            ref={form}
            encType="multipart/form-data"
            onSubmit={handleProductSubmit}
          >
            <div>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={12} md={5} sx={{ mt: 2 }}>
                  <div className="col-span-12">
                    <label
                      htmlFor="productName"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Product Name
                    </label>
                    <div className="mt-1">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          required
                          type="text"
                          name="productName"
                          id="productName"
                          autoComplete="productName"
                          className="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Product name"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-8 grid grid-cols-12 gap-4 mt-3">
                    <div className="col-span-8">
                      <label
                        htmlFor="brandName"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Brand Name
                      </label>
                      <div className="mt-1">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            type="text"
                            name="brandName"
                            id="brandName"
                            autoComplete="brandName"
                            className="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Brand name"
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-4">
                      <label
                        htmlFor="sku"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        SKU
                      </label>
                      <div className="mt-1">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            type="text"
                            name="sku"
                            id="sku"
                            autoComplete="sku"
                            className="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="#SKU"
                            value={sku}
                            onChange={(e) => setSku(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-8 grid grid-cols-12 gap-4 mt-3">
                    <div className="col-span-6">
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Category
                      </label>
                      <div className="mt-1">
                        <select
                          id="category"
                          name="category"
                          autoComplete="category"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option>Select</option>
                          <option>T-shirts</option>
                          <option>Shirt</option>
                          <option>Pant</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-span-6">
                      <label
                        htmlFor="productType"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Product Type
                      </label>
                      <div className="mt-1">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            type="text"
                            name="productType"
                            id="productType"
                            autoComplete="productType"
                            className="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Product Type"
                            value={productType}
                            onChange={(e) => setProductType(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-8 grid grid-cols-12 gap-4 mt-3">
                    <div className="col-span-6">
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Price
                      </label>
                      <div className="mt-1">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            type="number"
                            name="price"
                            id="price"
                            autoComplete="price"
                            className="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-6">
                      <label
                        htmlFor="salePrice"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Sales Price
                      </label>
                      <div className="mt-1">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            type="text"
                            name="salesPrice"
                            id="salesPrice"
                            autoComplete="salesPrice"
                            className="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Sales Price"
                            value={salesPrice}
                            onChange={(e) => setSalesPrice(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-8 grid grid-cols-12 gap-4 mt-3">
                    <div className="col-span-6">
                      <label
                        htmlFor="tag"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Tag
                      </label>
                      <div className="mt-1">
                        <select
                          id="tag"
                          name="tag"
                          autoComplete="tag"
                          value={tag}
                          onChange={(e) => setTag(e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option>Select tag</option>
                          <option>Best Selling</option>
                          <option>Discount</option>
                          <option>Fast Selling</option>
                          <option>Featured</option>
                          <option>New</option>
                          <option>Offer</option>
                          <option>Popular</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-span-6">
                      <label
                        htmlFor="color"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Color
                      </label>
                      <div className="mt-1">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <select
                            id="color"
                            name="color"
                            autoComplete="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option>Select</option>
                            <option>Black</option>
                            <option>Blue</option>
                            <option>Brown</option>
                            <option>Gray</option>
                            <option>Green</option>
                            <option>Orange</option>
                            <option>Pink</option>
                            <option>Purple</option>
                            <option>Red</option>
                            <option>White</option>
                            <option>Yellow</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-8 grid grid-cols-12 gap-4 mt-3">
                    <div className="col-span-6">
                      <label
                        htmlFor="fabric"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Fabric
                      </label>
                      <div className="mt-1">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            type="text"
                            name="fabric"
                            id="fabric"
                            autoComplete="fabric"
                            className="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Fabric"
                            value={fabric}
                            onChange={(e) => setFabric(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-6">
                      <label
                        htmlFor="style"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Style
                      </label>
                      <div className="mt-1">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            type="text"
                            name="style"
                            id="style"
                            autoComplete="style"
                            className="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Style"
                            value={style}
                            onChange={(e) => setStyle(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Machine care */}
                  <div className="col-span-8 grid grid-cols-12 gap-4 mt-3">
                  <div className="col-span-6">
                      <label
                        htmlFor="style"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Fabric Care
                      </label>
                      <div className="mt-1">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            type="text"
                            name="care"
                            id="care"
                            autoComplete="care"
                            className="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Care"
                            value={care}
                            onChange={(e) => setCare(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                {/* Size varients */}
                <div className="block text-md font-medium leading-6 mt-3 text-cyan-900">
                        Varients
                </div>
                {varients.map((element, index) => (
                  <div className="col-span-8 grid grid-cols-12 gap-4 mt-1" key={index}>
                    <div className="col-span-4">
                      <label
                        htmlFor="size"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Size
                      </label>
                      <div className="mt-1">
                        <select
                          id="size"
                          name="size"
                          autoComplete="size"
                          value={element.size}
                          onChange={e => handleChange(index, e)}
                          className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option>Select</option>
                          <option>S</option>
                          <option>M</option>
                          <option>L</option>
                          <option>XL</option>
                          <option>2XL</option>
                          <option>3XL</option>
                          <option>4XL</option>
                          <option>5XL</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-span-5">
                    <Typography variant="h6" color="blue-gray" className="font-medium text-sm">
                      Stock Quantity
                    </Typography>
                      <div className="relative mt-1">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-800 sm:max-w-md">
                        <Input
                        type="number"
                        id="stock"
                        name="stock"
                        value={element.stock}
                        onChange={e => handleChange(index, e)}
                        autoComplete="stock"
                        size="xs"
                        placeholder="Enter quantity"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                      <span className="bg-gray-400 rounded absolute inset-y-1 right-1 flex items-center p-1 text-xs text-black">
                        /Pcs
                      </span>
                        </div>
                      </div>
                    </div>

                    {
                index ? 
                <div className="col-span-2">
                <IconButton color="red" size="sm" onClick={() => removeFormFields(index)}>
                  <DeleteForeverIcon />
                </IconButton>
                </div>
                : null
              }
                  </div>
                ))}
                <div className="mt-2">
                <Button
                    type="button"
                    variant="contained"
                    size="small"
                    onClick={() => addFormFields()}
                    sx={{ bgcolor: "#006096" }}
                    className="w-fit"
                  >Add
                    </Button>
          </div>

                </Grid>

                <Grid item xs={12} sm={12} md={7} sx={{ mt: 2 }}>
                  <div className="col-span-full">
                    <label
                      htmlFor="images"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Add images
                    </label>
                    <div
                      className={`mt-2 flex justify-center rounded-lg border border-dashed bg-blue-100 border-blue-900/30 px-6 py-10 ${
                        dragging ? "bg-indigo-100" : ""
                      }`}
                      onDragEnter={handleDragEnter}
                      onDragOver={(e) => e.preventDefault()}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <div className="text-center">
                        <CloudUploadIcon
                          className="mx-auto text-blue-400"
                          aria-hidden="true"
                          sx={{ height: "40px", width: "40px" }}
                        />
                        <div className="mt-1 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="images"
                            className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload files</span>
                            <input
                              id="images"
                              name="images"
                              type="file"
                              className="sr-only"
                              multiple
                              onChange={handleFileChange}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG up to 6 files
                        </p>
                      </div>
                    </div>

                    {images.length > 0 && (
                      <div className="mt-4 grid grid-cols-6 gap-4">
                        {images.map((file, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Product ${index}`}
                              className="h-20 w-full object-cover rounded-md"
                            />
                            <div
                              className="absolute top-0 right-0 p-1 cursor-pointer"
                              onClick={() => handleRemove(index)}
                            >
                              <CloseIcon sx={{ backgroundColor: "#F0F0F0" }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="col-span-full mt-5">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Type here.."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-span-full mt-3">
                    <label
                      htmlFor="notes"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Notes
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="notes"
                        name="notes"
                        rows={2}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Type here.."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-span-full mt-3">
                    <label
                      htmlFor="yLink"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Youtube Link
                    </label>
                    <div className="mt-1">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          required
                          type="text"
                          name="yLink"
                          id="yLink"
                          autoComplete="yLink"
                          className="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="place link here"
                          value={yLink}
                          onChange={(e) => setYLink(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>

            {/* submit */}
            <div className="mt12 mb-4 col-span-8 grid grid-cols-12 gap-5">
              <div className="mt-12 mb-4 col-span-12 md:col-span-5 grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6">
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ color: "#006096", borderColor: "#006096" }}
                    className="w-full"
                    onClick={()=> navigate('/product-management')}
                  >
                    Cancel
                  </Button>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    sx={{ bgcolor: "#006096" }}
                    className="w-full"
                  >
                    PUBLISH PRODUCT
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;