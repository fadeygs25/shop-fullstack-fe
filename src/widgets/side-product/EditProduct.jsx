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
  setOpenEditProduct
} from "@/context";
import { toast } from 'react-toastify';
import { useCategories } from "@/store/context/CategoryContext";
import { useProducts } from "@/store/context/ProductContext";

export function EditProduct() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { openEditProduct } =
    controller;
  const { productsById, updateProduct } = useProducts();
  const { categories, getCategories, categoriesById, getCategoryById } = useCategories();
  const [product, setProduct] = React.useState({});
  const [singleCategory, setSingleCategory] = React.useState(null);


  // category
  React.useEffect(() => {
    getCategories()
  }, [])

  // set Product
  React.useEffect(() => {
    setProduct(productsById)
  }, [productsById])
  console.log(productsById)

  // category find id
  React.useEffect(() => {
    if (!categoriesById) {
      getCategoryById(product?.categoryId)
    }

    if (categoriesById?._id === product?.categoryId) {
      setSingleCategory(categoriesById)
    }
  }, [
    categoriesById, product?.categoryId, getCategoryById
  ]);
  //handle images
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  }

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProduct({ ...product, image: reader.result })
    }
  }

  const handleUpdate = () => {
    updateProduct(product)
  }

  return (
    <aside
      className={`fixed top-0 right-0 z-50 h-screen w-96 bg-white px-2.5 shadow-lg transition-transform duration-300 ${openEditProduct ? "translate-x-0" : "translate-x-96"
        }`}
    >
      <div className="flex items-start justify-between px-6 pt-8 pb-6">
        <div>
          <Typography variant="h5" color="blue-gray">
            Edit Product
          </Typography>
          <Typography className="font-normal text-blue-gray-600">
            See product options.
          </Typography>
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={() => setOpenEditProduct(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>
      <CardBody className="flex flex-col gap-4">
        <Input
          label="Name"
          size="lg"
          value={product?.nameProduct}
          onChange={(e) => setProduct({ ...product, nameProduct: e.target.value })}
        />
        <Input
          type="number"
          label="Price"
          size="lg"
          value={product?.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              defaultValue={1}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Category"
              onChange={(e) => setProduct({ ...product, categoryId: e.target.value })}
            >
              <MenuItem value={1}>{singleCategory?.nameCategory}</MenuItem>
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
        <Button onClick={handleUpdate} variant="gradient" fullWidth>
          Submit
        </Button>
      </CardFooter>
    </aside>
  );
}


export default EditProduct;
