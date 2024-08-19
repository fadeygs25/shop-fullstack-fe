import React from 'react'
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
import { useOrders } from '@/store/context/OrderContext';

export function ViewOrder({ order }) {
    const { usersById, getUserById } = useUsers();
    const { deleteOrder } = useOrders();
    const [users, setUsers] = React.useState({});

    React.useEffect(() => {
        getUserById(order.id_user)
    }, [order.id_user])

    React.useEffect(() => {
        if (usersById?._id === order?.id_user) {
            setUsers(usersById)
        }
    }, [usersById?._id, order?.id_user])
    console.log(usersById?._id)
    console.log(order?.id_user)
    console.log(users)

    const handleDelete = () => {
        deleteOrder(order.id_order);
    }

    return (
        <tr key={order.id_order}>
            <td className="py-3 px-5 border-b border-blue-gray-50">
                <Typography className="text-xs font-semibold text-blue-gray-600">
                    {order.id_order}
                </Typography>
            </td>
            <td className="py-3 px-5 border-b border-blue-gray-50">
                <div className="flex items-center gap-4">
                    <Avatar src={users.pic} alt={order.name} size="sm" />
                    <div>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                        >
                            {users.username}
                        </Typography>
                    </div>
                </div>
            </td>

            <td className="py-3 px-5 border-b border-blue-gray-50">
                <Typography className="text-xs font-semibold text-blue-gray-600">
                    {order.number}
                </Typography>
            </td>
            <td className="py-3 px-5 border-b border-blue-gray-50">
                <Typography className="text-xs font-semibold text-blue-gray-600">
                    {order.email}
                </Typography>
            </td>
            <td className="py-3 px-5 border-b border-blue-gray-50">
                <Typography className="text-xs font-semibold text-blue-gray-600">
                    {order.method}
                </Typography>
            </td>
            <td className="py-3 px-5 border-b border-blue-gray-50">
                <Typography className="text-xs font-semibold text-blue-gray-600">
                    {order.address}
                </Typography>
            </td>
            <td className="py-3 px-5 border-b border-blue-gray-50">
                <Typography className="text-xs font-semibold text-blue-gray-600">
                    {order.totalProducts}
                </Typography>
            </td>
            <td className="py-3 px-5 border-b border-blue-gray-50">
                <Typography className="text-xs font-semibold text-blue-gray-600">
                    ${order.total_price}
                </Typography>
            </td>
            <td className="py-3 px-5 border-b border-blue-gray-50">
                <Typography className="text-xs font-semibold text-blue-gray-600">
                    {order.placed_on}
                </Typography>
            </td>
            <td className="py-3 px-5 border-b border-blue-gray-50">
                <Typography className="text-xs font-semibold text-blue-gray-600">
                    {order.payment_status}
                </Typography>
            </td>
            <td className="py-3 px-5 border-b border-blue-gray-50">
                <Typography className="text-xs font-semibold text-blue-gray-600">
                    {order.is_paid == false ? (
                        <div>
                            Not Paid
                        </div>
                    ) : (
                        <div>
                            Paid
                        </div>
                    )}
                </Typography>
            </td>
            <td className="py-3 px-5 border-b border-blue-gray-50">
                <Typography
                    as="a"
                    href="#"
                    className="text-xs font-semibold text-blue-gray-600"
                >
                    Edit
                </Typography>
            </td>
            <td className="py-3 px-5 border-b border-blue-gray-50">
                <Typography
                    as="a"
                    className="text-xs font-semibold text-blue-gray-600"
                    onClick={handleDelete}
                >
                    Delete
                </Typography>
            </td>
        </tr>

    );
}

export default ViewOrder