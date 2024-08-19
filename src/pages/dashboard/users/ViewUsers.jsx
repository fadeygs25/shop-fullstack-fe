import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Chip,
    Tooltip,
    Progress,
    Button
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenAddProduct } from "@/context";
import { useUsers } from "@/store/context/UserContext";
import ViewUser from "./ViewUser";
import { toast } from 'react-toastify';

export function ViewUsers() {
    const [controller, dispatch] = useMaterialTailwindController();
    const { users, getUsers, toasts, clearErrors } = useUsers();
    const [viewUsers, setViewUsers] = React.useState([]);

    React.useEffect(() => {
        getUsers()
    }, [])

    React.useEffect(() => {
        setViewUsers(users)
    }, [users])


    return (

        <div className="mt-12 mb-8 flex flex-col gap-12">

            <div className="px-6">
                <Button variant="gradient"
                >
                    add user
                </Button>
            </div>
            <Card>
                <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
                    <Typography variant="h6" color="white">
                        Authors Table
                    </Typography>
                </CardHeader>

                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2  ">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                            <tr>
                                {["users", "full name", "email", "number", "address", "role"].map((el) => (
                                    <th
                                        key={el}
                                        className="border-b border-blue-gray-50 py-3 px-5 text-left"
                                    >
                                        <Typography
                                            variant="small"
                                            className="text-[11px] font-bold uppercase text-blue-gray-400"
                                        >
                                            {el}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                viewUsers?.map((user) => (
                                    <ViewUser key={user.id} user={user} />
                                ))
                            }
                        </tbody>
                    </table>
                </CardBody>
            </Card>

        </div>
    );
}

export default ViewUsers