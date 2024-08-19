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
import { Link } from "react-router-dom";

export function Carts() {
    const { getCartByUser, cartsByUser, toasts, clearErrors, carts, clearCurrentBlog } = useCarts();

    const total = cartsByUser.reduce((prev, item) => {
        return prev + (item.price * item.quantity)
    }, 0)

    React.useEffect(() => {
        getCartByUser()
    }, [])

  


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
                            Carts
                        </Typography>
                    </CardHeader>
                    <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                        <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                            <div class="rounded-lg md:w-2/3">
                                {
                                    cartsByUser.map((cart) => (
                                        <Cart key={cart._id} cart={cart} />
                                    ))
                                }
                            </div>
                            <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                                <div class="mb-2 flex justify-between">
                                    <p class="text-gray-700">Subtotal</p>
                                    <p class="text-gray-700">$ {total}</p>
                                </div>
                                <div class="flex justify-between">
                                    <p class="text-gray-700">Shipping</p>
                                    <p class="text-gray-700">$0</p>
                                </div>
                                <hr class="my-4" />
                                <div class="flex justify-between">
                                    <p class="text-lg font-bold">Total</p>
                                    <div class="">
                                        <p class="mb-1 text-lg font-bold">$ {total}</p>
                                        <p class="text-sm text-gray-700">including VAT</p>
                                    </div>
                                </div>
                                <Link to={`/auth/checkout`}>
                                    <button class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
                                </Link>
                            </div>
                        </div>
                    </CardBody>
                </Card>

            </div>
        </>
    );
}

export default Carts;
