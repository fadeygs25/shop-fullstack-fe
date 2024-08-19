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
  setOpenEditCategory
} from "@/context";
import { toast } from 'react-toastify';
import { useCategories } from "@/store/context/CategoryContext";

export function EditCategory() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { openEditCategory } =
    controller;
  const { categoriesById, updateCategory } = useCategories();
  const [category, setCategory] = React.useState(null);

  React.useEffect(() => {
    setCategory(categoriesById)
  }, [categoriesById])


  const handleUpdate = () => {
    updateCategory(category)
  }
  return (
    <aside
      className={`fixed top-0 right-0 z-50 h-screen w-96 bg-white px-2.5 shadow-lg transition-transform duration-300 ${openEditCategory ? "translate-x-0" : "translate-x-96"
        }`}
    >
      <div className="flex items-start justify-between px-6 pt-8 pb-6">
        <div>
          <Typography variant="h5" color="blue-gray">
            Edit Category
          </Typography>
          <Typography className="font-normal text-blue-gray-600">
            See category options.
          </Typography>
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={() => setOpenEditCategory(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>
      <CardBody className="flex flex-col gap-4">
        <Input
          label="Name"
          size="lg"
          value={category?.nameCategory}
          onChange={(e) => setCategory({ ...category, nameCategory: e.target.value })}
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


export default EditCategory;
