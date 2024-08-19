import React from "react";
import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Avatar,
    Typography,
    Tabs,
    TabsHeader,
    Tab,
    Switch,
    Tooltip,
    Button,
} from "@material-tailwind/react";
import {
    HomeIcon,
    ChatBubbleLeftEllipsisIcon,
    Cog6ToothIcon,
    PencilIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { platformSettingsData, conversationsData, projectsData } from "@/data";
import { useProducts } from "@/store/context/ProductContext";
import ProductList from "./ProductList";

export function ProductLists() {
    const { products, getProducts } = useProducts();
    const [viewProducts, setViewProducts] = React.useState([]);

    React.useEffect(() => {
        getProducts()
    }, [])

    React.useEffect(() => {
        setViewProducts(products)
    }, [products])


    return (
        <>
            <img
                src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
                className="absolute inset-0 z-0 h-full w-full object-cover"
            />

            <Card className="mx-3  mb-6 lg:mx-4 mb-8">
                <CardBody className="p-4">

                    <div className="px-4 pb-4">
                        <Typography variant="h6" color="blue-gray" className="mb-2">
                            Projects
                        </Typography>
                        <Typography
                            variant="small"
                            className="font-normal text-blue-gray-500"
                        >
                            Architects design houses
                        </Typography>
                        <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
                            {
                                viewProducts?.map((product) => (
                                    <ProductList key={product._id} product={product} />
                                ))
                            }
                        </div>
                    </div>
                </CardBody>
            </Card>
        </>
    );
}

export default ProductLists;
