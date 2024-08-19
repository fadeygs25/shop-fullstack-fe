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
import { useUsers } from "@/store/context/UserContext";
import { useNavigate } from 'react-router-dom';
import {
    useMaterialTailwindController,
    setOpenEditUser
} from "@/context";
import { EditUser } from "@/widgets/side-user";

export function ViewUser({ user }) {
    const [controller, dispatch] = useMaterialTailwindController();
    const { deleteUser, toasts, clearErrors, getUserById } = useUsers();

    const navigate = useNavigate();

    const handleDelete = () => {
        deleteUser(user._id);
        navigate('/dashboard/view-users');
    }

    return (
        <>
            <EditUser />
            <tr key={user._id}>
                <td className="py-3 px-5 border-b border-blue-gray-50">
                    <div className="flex items-center gap-4">
                        <Avatar src={user.pic} alt={user.name} size="sm" />
                        <div>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                            >
                                {user.username}
                            </Typography>
                        </div>
                    </div>
                </td>
                <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                        {user.fullName}
                    </Typography>
                </td>
                <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                        {user.email}
                    </Typography>
                </td>
                <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                        {user.number}
                    </Typography>
                </td>
                <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                        {user.address}
                    </Typography>
                </td>
                <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                        {user.role}
                    </Typography>
                </td>
                <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography
                        onClick={() => {
                            setOpenEditUser(dispatch, true);
                            getUserById(user?._id)
                        }}
                        className="text-xs font-semibold text-blue-gray-600"
                    >
                        Edit
                    </Typography>
                </td>
                <td className="py-3 px-5 border-b border-blue-gray-50">
                    <Typography
                        className="text-xs font-semibold text-blue-gray-600"
                        onClick={handleDelete}
                    >
                        Delete
                    </Typography>
                </td>
            </tr>
        </>
    );
}

export default ViewUser