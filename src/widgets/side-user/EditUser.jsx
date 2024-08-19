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
  setOpenEditUser
} from "@/context";
import { toast } from 'react-toastify';
import { useUsers } from "@/store/context/UserContext";

export function EditUser() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { openEditUser } =
    controller;
  const { usersById, updateUser } = useUsers();
  const [profile, setProfile] = React.useState({});

  React.useEffect(() => {
    setProfile(usersById)
  }, [usersById])
  console.log(usersById)
  //handle images
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  }

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfile({ ...profile, image: reader.result })
    }
  }

  const handleUpdate = () => {
    updateUser(profile)
  }
  return (
    <aside
      className={`fixed top-0 right-0 z-50 h-screen w-96 bg-white px-2.5 shadow-lg transition-transform duration-300 ${openEditUser ? "translate-x-0" : "translate-x-96"
        }`}
    >
      <div className="flex items-start justify-between px-6 pt-8 pb-6">
        <div>
          <Typography variant="h5" color="blue-gray">
            Edit User
          </Typography>
          <Typography className="font-normal text-blue-gray-600">
            See user options.
          </Typography>
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={() => setOpenEditUser(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>
      <CardBody className="flex flex-col gap-4">
        <Input
          label="User name"
          name='username'
          size="lg"
          type="text"
          value={profile?.username}
          onChange={(e) => setProfile({ ...profile, username: e.target.value })}
        />
        <Input
          label="Full name"
          name='fullName'
          value={profile?.fullName}
          size="lg"
          onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
        />
        <Input
          label="Email"
          name='email'
          value={profile?.email}
          size="lg"
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        />
        <Input
          label="Number"
          name='number'
          value={profile?.number}
          size="lg"
          onChange={(e) => setProfile({ ...profile, number: e.target.value })}
        />
        <Input
          label="Address"
          name='address'
          value={profile?.address}
          size="lg"
          onChange={(e) => setProfile({ ...profile, address: e.target.value })}
        />
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


export default EditUser;
