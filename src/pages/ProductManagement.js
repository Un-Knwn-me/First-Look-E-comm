import React, { useEffect, useState } from "react";
import Base from "../components/Base";
import DateInput from "../components/DateInput";
import {
  Avatar,
  Button,
  CardFooter,
  Chip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Backend_URL } from "../App";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import ZoomInOutlinedIcon from "@mui/icons-material/ZoomInOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Stack, Switch } from "@mui/material";
import { styled } from "@mui/material/styles";

const TABLE_HEAD = [
  "Product",
  "SKU",
  "Category",
  "Color",
  "Size",
  "Price",
  "Stock",
  "Status",
  "Publish",
  "Action",
];

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

const ProductManagement = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [publishState, setPublishState] = useState({});

  const handleOpen = (_id) => {
    setDeleteId(_id);
    setOpen(!open);
  };

  const handleSwitchChange = async (_id, newState) => {
    setPublishState((prevStates) => ({
      ...prevStates,
      [_id]: newState,
    }));

    // You can also send an API request here to update the state on the server.
    try {
      const response = await axios.put(
        `${Backend_URL}/admin/products/publish/${_id}`,
        { publishState: newState }
      );

      if (response.status === 200) {
        console.log(response.message);
      }
    } catch (error) {
      console.error("Error updating switch state:", error);
    }
  };

  // Fetch Product datas
  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        `${Backend_URL}/admin/products/list`,
        {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        }
      );
      setRows(response.data.products);

      console.log(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [publishState]);

  // delete product
  const handleDelete = async (event) => {
    try {
      console.log(deleteId);
      const response = await axios.delete(
        `${Backend_URL}/admin/product/${deleteId}`,
        {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          //   "Content-Type": "multipart/form-data",
          // },
        }
      );

      if (response.status === 200) {
        console.log("Deleted");
        getAllProducts();
      }
    } catch (error) {
      // toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <Base title="Product Management">
      {/* Product Search */}
      <div className="rounded-xl py-5 px-8 shadow-lg backdrop-blur-md max-sm:px-8 search-product">
        <div className="grid grid-cols-12 gap-5 my-2">
          <div className="col-span-3">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Product Name
            </label>
            <div className="mt-1">
              <div className="flex rounded-md shadow-sm ring-1 bg-white ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  className="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Product name"
                />
              </div>
            </div>
          </div>

          <div className="col-span-3">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Category
            </label>
            <div className="mt-1">
              <select
                id="country"
                name="country"
                autoComplete="country-name"
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option>Select</option>
                <option>T-shirts</option>
                <option>Shirt</option>
                <option>Pant</option>
              </select>
            </div>
          </div>

          <div className="col-span-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              SKU
            </label>
            <div className="mt-1">
              <div className="flex rounded-md shadow-sm ring-1 bg-white ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="text"
                  name="sku"
                  id="sku"
                  autoComplete="sku"
                  className="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="SKU"
                />
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Status
            </label>
            <div className="mt-1">
              <select
                id="status"
                name="status"
                autoComplete="status"
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option>Select</option>
                <option>In-Stock</option>
                <option>Out of Stock</option>
              </select>
            </div>
          </div>

          <div className="col-span-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Sort by
            </label>
            <div className="mt-1">
              <select
                id="sortby"
                name="sortby"
                autoComplete="sortby"
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option>Select</option>
                <option>Date: New to Old</option>
                <option>Date: Old to New</option>
                <option>Popular</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2nd line */}

        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-3">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Start Date
            </label>
            <div className="mt-1">
              <DateInput />
            </div>
          </div>

          <div className="col-span-3">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              End Date
            </label>
            <div className="mt-1">
              <DateInput />
            </div>
          </div>

          <div className="col-span-3 mt-7">
            <button
              class="h-8 px-8 font-normal text-sm rounded-md bg-greenbtn border border-greenbg text-white"
              type="submit"
            >
              SEARCH
            </button>
          </div>
        </div>
      </div>

      {/* Table of content */}
      <div className="my-10">
        <div className="mb-8 flex items-center justify-between gap-2">
          <div>
            <Button
              variant="outlined"
              className="text-blue-500 border-blue-500"
              size="sm"
            >
              Export
            </Button>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button className="flex items-center gap-3 bg-blue-500" size="sm">
              Bulk Selection
            </Button>
            <Button
              variant="outlined"
              className="text-red-500 border-red-500"
              size="sm"
            >
              Delete
            </Button>
            <Button
              className="flex items-center border-blue-500 text-blue-500 gap-3"
              onClick={() => navigate("/add-Product")}
              variant="outlined"
              size="sm"
            >
              Add Product
            </Button>
          </div>
        </div>

        <div>
          <div className="rounded-xl shadow-lg border border-gray-100 backdrop-blur-md">
            <div className="overflow-scroll px-0">
              <table className="w-full min-w-max table-auto text-left">
                <thead className="bg-gray-300">
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-y border-blue-gray-300 bg-blue-gray-50/50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="black"
                          className="font-semibold leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map(
                    (
                      {
                        _id,
                        sku,
                        images,
                        productName,
                        brandName,
                        category,
                        publish,
                        productType,
                        salesPrice,
                        price,
                        color,
                        size,
                        status,
                        stock,
                      },
                      index
                    ) => {
                      const isLast = index === rows.length - 1;
                      const clasLast = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={sku}>
                          <td className={clasLast}>
                            <div className="flex items-center gap-3">
                              <Avatar
                                src={images[0]}
                                alt={productName}
                                size="sm"
                              />
                              <div className="flex flex-col">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {productName}
                                </Typography>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal opacity-70"
                                >
                                  {brandName}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={clasLast}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                #{sku}
                              </Typography>
                            </div>
                          </td>
                          <td className={clasLast}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {category}
                              </Typography>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-70"
                              >
                                {productType}
                              </Typography>
                            </div>
                          </td>
                          <td className={clasLast}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {color}
                              </Typography>
                            </div>
                          </td>
                          <td className={clasLast}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {size}
                              </Typography>
                            </div>
                          </td>
                          <td className={clasLast}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                Rs. {salesPrice}
                              </Typography>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-70"
                                style={{ textDecoration: "line-through" }}
                              >
                                Rs. {price}
                              </Typography>
                            </div>
                          </td>
                          <td className={clasLast}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {stock}
                            </Typography>
                          </td>
                          <td className={clasLast}>
                            <div className="w-max">
                              <Chip
                                variant="ghost"
                                size="sm"
                                value={status ? "In-Stock" : "Out of Stock"}
                                color={status ? "green" : "red"}
                              />
                            </div>
                          </td>
                          {/* handle publish */}
                          <td className={clasLast}>
                            <div className="flex items-center">
                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                              >
                                <AntSwitch
                                  defaultChecked={publish}
                                  onChange={(event) =>
                                    handleSwitchChange(
                                      _id,
                                      event.target.checked
                                    )
                                  }
                                  inputProps={{ "aria-label": "ant design" }}
                                />
                              </Stack>
                            </div>
                          </td>
                          <td className={clasLast}>
                            <Tooltip content="View Product">
                              <IconButton
                                variant="text"
                                onClick={() => navigate(`/edit-Product/${_id}`)}
                              >
                                <ZoomInOutlinedIcon className="h-3 w-3" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip content="Edit Product">
                              <IconButton
                                variant="text"
                                onClick={() => navigate(`/edit-Product/${_id}`)}
                              >
                                <EditNoteOutlinedIcon className="h-3 w-3" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip content="Delete Product">
                              <IconButton
                                variant="text"
                                onClick={() => handleOpen(_id)}
                              >
                                <DeleteOutlinedIcon className="h-3 w-3" />
                              </IconButton>
                            </Tooltip>
                            {/* Handle delete */}
                            <div>
                              <Dialog open={open} handler={handleOpen}>
                                <DialogHeader>Delete Product!</DialogHeader>
                                <DialogBody>
                                  Do you realy want to delete the file? It can't
                                  be recovered.
                                </DialogBody>
                                <DialogFooter>
                                  <Button
                                    variant="text"
                                    color="blue"
                                    onClick={handleOpen}
                                    className="mr-1"
                                  >
                                    <span>Cancel</span>
                                  </Button>
                                  <Button
                                    variant="gradient"
                                    color="red"
                                    onClick={handleDelete}
                                  >
                                    <span>Delete</span>
                                  </Button>
                                </DialogFooter>
                              </Dialog>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                Page 1 of 10
              </Typography>
              <div className="flex gap-2">
                <Button variant="outlined" color="blue" size="sm">
                  Previous
                </Button>
                <Button variant="outlined" color="blue" size="sm">
                  Next
                </Button>
              </div>
            </CardFooter>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default ProductManagement;