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
import { useMaterialTailwindController, setOpenAddProduct } from "@/context";
import { AddProduct } from "@/widgets/side-product";
import ViewProduct from "./ViewProduct";
import { toast } from 'react-toastify';
import { EditProduct } from "@/widgets/side-product";


export function ViewProducts() {
    const [controller, dispatch] = useMaterialTailwindController();
    const { products, toasts, getProducts, deleteProduct, clearErrors } = useProducts();
    const [viewProducts, setViewProducts] = React.useState([]);

    React.useEffect(() => {
        getProducts()
    }, [])

    React.useEffect(() => {
        setViewProducts(products)
    }, [products])

    React.useEffect(() => {

        if (toasts) {
            toasts.forEach(ele => {
                toast(ele.message, { type: ele.type })
            });
            clearErrors()

        }
    }, [toasts, clearErrors])


    return (

        <div className="mt-12 mb-8 flex flex-col gap-12">
            <AddProduct />
            <EditProduct />
            <div className="px-6">
                <Button variant="gradient"
                    onClick={() => setOpenAddProduct(dispatch, true)}
                >
                    add product
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
                                {["products", "price", "category", "", ""].map((el) => (
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
                                viewProducts?.map((product) => (
                                    <ViewProduct key={product._id} product={product} />
                                ))
                            }
                        </tbody>
                    </table>
                </CardBody>
            </Card>

        </div>
    );
}

export default ViewProducts