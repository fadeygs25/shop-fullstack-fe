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
import { useProducts } from "@/store/context/ProductContext";
import { Link } from "react-router-dom";



export function ViewComments() {
    const { products, getProducts } = useProducts();
    React.useEffect(() => {
        getProducts()
    }, [])

    return (

        <div className="mt-12 mb-8 flex flex-col gap-12">
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
                                {["products", ""].map((el) => (
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
                                products.map((product) => (
                                    <tr key={product._id}>
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <div className="flex items-center gap-4">
                                                <Avatar src={product.pic} alt={product.name} size="sm" />
                                                <div>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-semibold"
                                                    >
                                                        {product.nameProduct}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-5 border-b border-blue-gray-50">
                                            <Link
                                                as="a"
                                                to={`/dashboard/view-comment/${product._id}`}
                                                className="text-xs font-semibold text-blue-gray-600"
                                            >
                                                Detail
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </CardBody>
            </Card>

        </div >
    );
}

export default ViewComments