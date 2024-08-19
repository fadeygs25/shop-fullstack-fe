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
import { useOrders } from "@/store/context/OrderContext";
import ViewOrder from "./ViewOrder";

export function ViewOrders() {
    const [controller, dispatch] = useMaterialTailwindController();
    const { orders, getOrders } = useOrders();
    const [myOrders, setMyOrders] = React.useState([]);
    React.useEffect(() => {
        getOrders()
    }, [])

    React.useEffect(() => {
        setMyOrders(orders)
    }, [orders])


    return (

        <div className="mt-12 mb-8 flex flex-col gap-12">
            <div className="px-6">
                <Button variant="gradient"
                >
                    add order
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
                                {["id", "users", "phone", "email", "method", "address", "Total Products", "Total price", "Placed on", "Payment status", "Is Paid", "", ""].map((el) => (
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
                                myOrders.map((order) => (
                                    <ViewOrder key={order.id_order} order={order} />
                                ))
                            }
                        </tbody>
                    </table>
                </CardBody>
            </Card>

        </div>
    );
}

export default ViewOrders