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
import { useProducts } from "@/store/context/ProductContext";
import { useCarts } from "@/store/context/CartContext";

export function Cart({ cart }) {
    const { deleteCart, updateCart } = useCarts();
    const { productsById, getProductById } = useProducts();
    const [singleProduct, setSingleProduct] = React.useState(null);

    React.useEffect(() => {
        if (!singleProduct) {
            getProductById(cart.productId);
        }
        if (productsById?._id === cart.productId) {
            setSingleProduct(productsById)
        }
    }, [
        cart.productId,
        productsById,
        singleProduct
    ])

    const handleDelete = () => {
        deleteCart(cart._id);
    }

    const handleDecrement = (quantity) => {
        const quantityDe = quantity - 1;
        const quantityChange = {
            quantity: quantityDe,
            cartId: cart._id,
            price: singleProduct.price
        }
        updateCart(quantityChange)
    };
    const handleIncrement = (quantity) => {
        const quantityIn = quantity + 1
        const quantityChange = {
            quantity: quantityIn,
            cartId: cart._id,
            price: singleProduct.price
        }
        updateCart(quantityChange)
    };


    return (
        <div key={cart._id} class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <img src={singleProduct?.pic} alt="product-image" class="w-full rounded-lg sm:w-40" />
            <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div class="mt-5 sm:mt-0">
                    <h2 class="text-lg font-bold text-gray-900"> {singleProduct?.nameProduct}</h2>
                    {/* <p class="mt-1 text-xs text-gray-700">36EU - 4US</p> */}
                </div>
                <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div class="flex items-center border-gray-100">
                        <span
                            onClick={() => {
                                handleDecrement(cart.quantity);
                            }} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                        <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={cart.quantity} min="1" />
                        <span onClick={() => {
                            handleIncrement(cart.quantity);
                        }}
                            className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>

                    </div>
                    <div class="flex items-center space-x-4">
                        <p class="text-sm">${cart.price}</p>
                        <svg onClick={handleDelete} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
            </div >
        </div >

    );
}

export default Cart;
