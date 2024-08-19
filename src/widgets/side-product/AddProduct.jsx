import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Switch,
  Typography,
  Chip,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
} from "@material-tailwind/react";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import {
  useMaterialTailwindController,
  setOpenAddProduct
} from "@/context";
import { useProducts } from "@/store/context/ProductContext";
import { useCategories } from "@/store/context/CategoryContext";
import { toast } from 'react-toastify';


export function AddProduct() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { openAddProduct } =
    controller;
  const { categories, getCategories } = useCategories();
  React.useEffect(() => {
    getCategories()

  }, [])
  const { createProduct } = useProducts()
  const [newProduct, setNewProduct] = React.useState({
    nameProduct: '',
    price: '',
    categoryId: '',
    image: []
  });

  //handle images
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  }

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setNewProduct({ ...newProduct, image: reader.result })
    }
  }

  const handleSave = () => {
    const {
      nameProduct,
      price,
      categoryId,
      image,
    } = newProduct
    if (!nameProduct || !price || !categoryId || !image) {
      toast('Please fill all the fields', { type: 'error' })
      return
    }
    createProduct(newProduct);

  }

  return (
    <aside
      className={`fixed top-0 right-0 z-50 h-screen w-96 bg-white px-2.5 shadow-lg transition-transform duration-300 ${openAddProduct ? "translate-x-0" : "translate-x-96"
        }`}
    >
      <div className="flex items-start justify-between px-6 pt-8 pb-6">
        <div>
          <Typography variant="h5" color="blue-gray">
            Add Product
          </Typography>
          <Typography className="font-normal text-blue-gray-600">
            See product options.
          </Typography>
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={() => setOpenAddProduct(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>
      <CardBody className="flex flex-col gap-4">
        <Input
          label="Name"
          size="lg"
          onChange={(e) => setNewProduct({ ...newProduct, nameProduct: e.target.value })}
        />
        <Input
          type="number"
          label="Price"
          size="lg"
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        {/* <select onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} label="Select Category">
          {myCategories.map(
            ({ _id, category }, key) => {
              const className = `py-3 px-5 ${key === myCategories.length - 1
                ? ""
                : "border-b border-blue-gray-50"
                }`;

              return (
                <option className={className} key={category} value={_id}>
                  {category}
                </option>
              );
            }
          )}
        </select> */}
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Category"
              onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
            >
              {categories.map(
                ({ _id, nameCategory }, key) => {
                  const className = `py-3 px-5 ${key === categories.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                    }`;

                  return (
                    <MenuItem className={className} key={nameCategory} value={_id}>
                      {nameCategory}
                    </MenuItem>
                  );
                }
              )}
            </Select>
          </FormControl>
        </Box>
        <input
          onChange={handleImage}
          className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
          type="file"
          accept="image/jpg, image/jpeg, image/png, image/webp"
        />

      </CardBody>
      <CardFooter className="pt-0">
        <Button onClick={handleSave} variant="gradient" fullWidth>
          Submit
        </Button>
      </CardFooter>
    </aside>

  );
}


export default AddProduct;
