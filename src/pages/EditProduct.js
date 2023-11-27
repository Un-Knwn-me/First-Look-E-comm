import React, { useEffect, useState, useRef, useCallback } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Slide } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import Base from "../components/Base";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Backend_URL } from "../App";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditProduct = () => {
  const { id } = useParams();
  const form = useRef();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({});
  const [images, setImages] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [removedImages, setRemovedImages] = useState([]);
  const [updatedImages, setUpdatedImages] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // delete product
  const handleDelete = async (event) => {
    try {
      const response = await axios.delete(
        `${Backend_URL}/admin/product/${id}`,
        {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          //   "Content-Type": "multipart/form-data",
          // },
        }
      );

      if (response.status === 200) {
        navigate('/product-management')
      }
    } catch (error) {
      // toast.error(error.response.data.message);
      console.log(error);
    }
  };

  // Drag and Drop
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
    setUpdatedImages([...updatedImages, ...droppedImages]);
  };

  const handleFileChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setUpdatedImages([...updatedImages, ...selectedImages]);
  };

  const handleRemoveUpdate = (index) => {
    const imageup = [...updatedImages];
    imageup.splice(index, 1);
    setUpdatedImages(imageup);
  };

  const handleRemove = (index) => {
    const updatedImage = [...images];
    const removedImage = updatedImage.splice(index, 1);
    setRemovedImages(removedImage);
    setImages(updatedImage);
  };

  // Function to handle input changes for all the fields
  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  // Fetch the data of the particular contact based on the id
  const fetchProductData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${Backend_URL}/admin/product/${id}`,
        {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        }
      );
      setProductData(response.data.product);
      setImages(response.data.product.images);
      console.log(response.data.product);
    } catch (error) {
      console.error(error);
    }
  },[id]);

  useEffect(() => {
    fetchProductData();
  },[fetchProductData]);

  // Update the new data in to the server
  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();

      // Append updated images to the FormData
      for (let i = 0; i < updatedImages.length; i++) {
        formData.append("updatedImages", updatedImages[i]);
      }

      // Append removed images to the FormData
      for (let i = 0; i < removedImages.length; i++) {
        formData.append("removedImages", removedImages[i]);
      }

      // Append other product data to the FormData
      for (const key in productData) {
        formData.append(key, productData[key]);
      }

      console.log(formData);

      const res = await axios.put(
        `${Backend_URL}/admin/product/update/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.status === 202) {
        navigate('/product-management')
        // toast.success(res.data.message);
      }
    } catch (error) {
      // toast.error(error.response.data.message);
    }
  };

  return (
    <Base
      title="Edit Product"
      description="Edit your product and necessary information"
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
            onSubmit={handleUpdate}
          >
            <div>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={12} md={5} sx={{ mt: 2 }}>
                  <div className="col-span-12">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Product Name
                    </label>
                    <div className="mt-1">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          name="productName"
                          id="productName"
                          autoComplete="productName"
                          className="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Product name"
                          value={productData.productName}
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-8 grid grid-cols-12 gap-4 mt-3">
                    <div className="col-span-8">
                      <label
                        htmlFor="name"
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
                            value={productData.brandName}
                            onChange={(e) => handleInputChange(e)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-4">
                      <label
                        htmlFor="anotherField"
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
                            value={productData.sku}
                            onChange={(e) => handleInputChange(e)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-8 grid grid-cols-12 gap-4 mt-3">
                    <div className="col-span-6">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Category
                      </label>
                      <div className="mt-1">
                        <select
                          id="category"
                          name="category"
                          autoComplete="category"
                          value={productData.category}
                          onChange={(e) => handleInputChange(e)}
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
                        htmlFor="anotherField"
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
                            value={productData.productType}
                            onChange={(e) => handleInputChange(e)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-8 grid grid-cols-12 gap-4 mt-3">
                    <div className="col-span-6">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Size
                      </label>
                      <div className="mt-1">
                        <select
                          id="size"
                          name="size"
                          autoComplete="size"
                          value={productData.size}
                          onChange={(e) => handleInputChange(e)}
                          className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option>Select</option>
                          <option>XS</option>
                          <option>S</option>
                          <option>M</option>
                          <option>L</option>
                          <option>XL</option>
                          <option>2XL</option>
                          <option>3XL</option>
                          <option>4XL</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-span-6">
                      <label
                        htmlFor="anotherField"
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
                            value={productData.color}
                            onChange={(e) => handleInputChange(e)}
                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Price
                      </label>
                      <div className="mt-1">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            type="text"
                            name="price"
                            id="price"
                            autoComplete="price"
                            className="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Price"
                            value={productData.price}
                            onChange={(e) => handleInputChange(e)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-6">
                      <label
                        htmlFor="anotherField"
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
                            value={productData.salesPrice}
                            onChange={(e) => handleInputChange(e)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-8 grid grid-cols-12 gap-4 mt-3">
                    <div className="col-span-6">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Tag
                      </label>
                      <div className="mt-1">
                        <select
                          id="tag"
                          name="tag"
                          autoComplete="tag"
                          value={productData.tag}
                          onChange={(e) => handleInputChange(e)}
                          className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option>Select tag</option>
                          <option>New</option>
                          <option>Best Selling</option>
                          <option>Featured</option>
                          <option>Offer</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-span-6">
                      <label
                        htmlFor="anotherField"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Stock Quantity
                      </label>
                      <div className="mt-1">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            type="text"
                            name="stock"
                            id="stock"
                            autoComplete="stock"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Stock Count"
                            value={productData.stock}
                            onChange={(e) => handleInputChange(e)}
                          />
                          <span className="flex select-none items-center pr-3 text-gray-500 sm:text-sm">
                            /Pcs
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-8 grid grid-cols-12 gap-4 mt-3">
                    <div className="col-span-6">
                      <label
                        htmlFor="name"
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
                            value={productData.fabric}
                            onChange={(e) => handleInputChange(e)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-6">
                      <label
                        htmlFor="anotherField"
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
                            value={productData.style}
                            onChange={(e) => handleInputChange(e)}
                          />
                        </div>
                      </div>
                    </div>
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
                            htmlFor="updatedImages"
                            className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload files</span>
                            <input
                              id="updatedImages"
                              name="updatedImages"
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

                    {updatedImages.length > 0 && (
                      <div className="mt-4 grid grid-cols-6 gap-4">
                        {updatedImages.map((file, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Product ${index}`}
                              className="h-20 w-full object-cover rounded-md"
                            />
                            <div
                              className="absolute top-0 right-0 p-1 cursor-pointer"
                              onClick={() => handleRemoveUpdate(index)}
                            >
                              <CloseIcon sx={{ backgroundColor: "#F0F0F0" }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div>
                      {images.length > 0 && (
                        <div className="mt-4 grid grid-cols-6 gap-4">
                          {images.map((file, index) => (
                            <div key={index} className="relative">
                              <img
                                src={file}
                                alt={`Product ${index}`}
                                className="h-20 w-full object-cover rounded-md"
                              />
                              <div
                                className="absolute top-0 right-0 p-1 cursor-pointer"
                                onClick={() => handleRemove(index)}
                              >
                                <CloseIcon
                                  sx={{ backgroundColor: "#F0F0F0" }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-span-full mt-5">
                    <label
                      htmlFor="about"
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
                        value={productData.description}
                        onChange={(e) => handleInputChange(e)}
                      />
                    </div>
                  </div>

                  <div className="col-span-full mt-3">
                    <label
                      htmlFor="about"
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
                        value={productData.notes}
                        onChange={(e) => handleInputChange(e)}
                      />
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </form>

          <div className="mt12 mb-4 col-span-8 grid grid-cols-12 gap-10">
            <div className="mt-12 mb-4 col-span-12 md:col-span-5 grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-4">
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    color: "#FF0000",
                    borderColor: "#FF0000",
                    "&:hover": {
                      borderColor: "#FF0000",
                    },
                  }}
                  className="w-full"
                  onClick={handleClickOpen}
                >
                  Delete
                </Button>
                <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete Product?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          Do you realy want to delete the file? It can't be recovered.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color='error' onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
              </div>
              <div className="col-span-12 md:col-span-4">
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
              <div className="col-span-12 md:col-span-4">
                <Button
                  variant="contained"
                  size="small"
                  sx={{ bgcolor: "#006096" }}
                  onClick={handleUpdate}
                  className="w-full"
                >
                  UPDATE
                </Button>
              </div>
            </div>

            {/* <div className="mt-12 mb-4 col-span-12 md:col-span-7 grid grid-cols-12 gap-4">
    <div className="col-span-12 md:col-span-6">
        <Button variant="outlined" size="small" sx={{ color:"#FF0000", borderColor: "#FF0000", "&:hover": {
      borderColor: "#FF0000",
    }, }} className="w-full">
            Delete
        </Button>
    </div>
</div> */}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default EditProduct;