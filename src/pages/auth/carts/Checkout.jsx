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
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { useCarts } from "@/store/context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import Cart from "./Cart";
import { CartsCheckout } from "@/widgets/carts";
import { useUsers } from "@/store/context/UserContext";
import { useOrders } from "@/store/context/OrderContext";
import moment from 'moment';

export function Checkout() {
    const { getCartByUser, cartsByUser, toasts, clearErrors, carts, clearCurrentBlog } = useCarts();
    const { currentUser, getProfile } = useUsers();
    const { createOrder, currentOrder } = useOrders();
    const navigate = useNavigate();


    React.useEffect(() => {
        getProfile();
    }, [])

    React.useEffect(() => {
        getCartByUser()
    }, [])

    const total = cartsByUser.reduce((prev, item) => {
        return prev + (item.price * item.quantity)
    }, 0)

    const [newOrder, setNewOrder] = React.useState({
        id_user: currentUser._id,
        email: currentUser.email,
        number: currentUser.number,
        address: currentUser.address,
        method: '',
        total_products: cartsByUser,
        total_price: total,
        placed_on: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        payment_status: "pending",
        is_paid: false,
    });

    const handleSave = () => {
        const { id_user, email, number, address, method, total_products, total_price, placed_on, payment_status } = newOrder
        if (!id_user || !email || !number || !address || !method || !total_products || !total_price || !placed_on || !payment_status) {
            toast('Please fill all the fields', { type: 'error' })
            return
        }
        createOrder(newOrder);
        if (method === "PayPal") {
            navigate(`/auth/paypal/${currentOrder?.id_order}`);
        }
    }

    return (
        <>
            <img
                src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
                className="absolute inset-0 z-0 h-full w-full object-cover"
            />
            <div className="mx-3 mt-12 mb-8 flex flex-col gap-12">
                <Card>
                    <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
                        <Typography variant="h6" color="white">
                            Checkout
                        </Typography>
                    </CardHeader>
                    <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">

                            <div className="w-full bg-white   px-5 py-10 text-gray-800">
                                <div className="w-full">
                                    <div className="-mx-3 md:flex items-start">
                                        <div className="px-3 md:w-7/12 lg:pr-10">
                                            {
                                                cartsByUser.map((cart) => (
                                                    <CartsCheckout key={cart._id} cart={cart} />
                                                ))
                                            }
                                            <div className="mb-6 pb-6 border-b border-gray-200 text-gray-800">
                                                <div className="w-full flex mb-3 items-center">
                                                    <div className="flex-grow">
                                                        <span className="text-gray-600">Subtotal</span>
                                                    </div>
                                                    <div className="pl-3">
                                                        <span className="font-semibold">${total}</span>
                                                    </div>
                                                </div>
                                                <div className="w-full flex items-center">
                                                    <div className="flex-grow">
                                                        <span className="text-gray-600">Taxes (GST)</span>
                                                    </div>
                                                    <div className="pl-3">
                                                        <span className="font-semibold">$0</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                                                <div className="w-full flex items-center">
                                                    <div className="flex-grow">
                                                        <span className="text-gray-600">Total</span>
                                                    </div>
                                                    <div className="pl-3">
                                                        <span className="font-semibold text-gray-400 text-sm">AUD</span> <span
                                                            className="font-semibold">${total}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-3 md:w-5/12">
                                            <div
                                                className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                                                <div className="w-full flex mb-3 items-center">
                                                    <div className="w-32">
                                                        <span className="text-gray-600 font-semibold">Contact</span>
                                                    </div>
                                                    <div className="flex-grow pl-3">
                                                        <span>{currentUser.fullName}</span>
                                                    </div>
                                                </div>
                                                <div className="w-full flex items-center">
                                                    <div className="w-32">
                                                        <span className="text-gray-600 font-semibold">Billing Address</span>
                                                    </div>
                                                    <div className="flex-grow pl-3">
                                                        <span>{currentUser.address}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full mx-auto rounded-lg bg-white  text-gray-800 font-light mb-6">
                                                <div class="w-full p-3">
                                                    <label for="type2" class="flex items-center cursor-pointer">
                                                        <input onChange={(e) => setNewOrder({ ...newOrder, method: e.target.value })} value="PayPal" type="radio" class="form-radio h-5 w-5 text-indigo-500" name="type" id="type2" />
                                                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" width="80" class="ml-3" />
                                                    </label>
                                                </div>
                                                <div>
                                                    <button onClick={handleSave}
                                                        className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-2 font-semibold"><i
                                                            className="mdi mdi-lock-outline mr-1"></i> PAY NOW</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>

            </div>
        </>
    );
}

export default Checkout;
