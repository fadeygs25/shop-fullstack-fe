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
  Select,
  Option
} from "@material-tailwind/react";

import {
  useMaterialTailwindController,
  setOpenAddCategory
} from "@/context";
import { useCategories } from "@/store/context/CategoryContext";
import { toast } from 'react-toastify';

export function AddCategory() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { openAddCategory } =
    controller;
  const { createCategory } = useCategories()
  const [newCategory, setNewCategory] = React.useState({
    nameCategory: '',
  });



  const handleSave = () => {
    if (newCategory.nameCategory.length > 0) {
      createCategory(newCategory);
    } else {
      toast('Please provide a blog title and content', { type: 'error' })
    }
  }

  return (
    <aside
      className={`fixed top-0 right-0 z-50 h-screen w-96 bg-white px-2.5 shadow-lg transition-transform duration-300 ${openAddCategory ? "translate-x-0" : "translate-x-96"
        }`}
    >
      <div className="flex items-start justify-between px-6 pt-8 pb-6">
        <div>
          <Typography variant="h5" color="blue-gray">
            Add Category
          </Typography>
          <Typography className="font-normal text-blue-gray-600">
            See category options.
          </Typography>
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={() => setOpenAddCategory(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>
      <CardBody className="flex flex-col gap-4">
        <Input
          label="Category"
          size="lg"
          onChange={(e) => setNewCategory({ ...newCategory, nameCategory: e.target.value })}
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


export default AddCategory;
