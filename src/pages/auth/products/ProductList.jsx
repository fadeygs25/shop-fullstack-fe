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
import { useCategories } from "@/store/context/CategoryContext";
import { Link } from "react-router-dom";

export function ProductList({ product }) {
    const { categoriesById, getCategoryById } = useCategories();
    const [singleCategory, setSingleCategory] = React.useState(null);
    React.useEffect(() => {
        if (!singleCategory) {
            getCategoryById(product.categoryId)
        }

        if (categoriesById?._id === product.categoryId) {
            setSingleCategory(categoriesById)
        }
    }, [categoriesById, product.categoryId, getCategoryById])


    return (
        <Card key={product.name} color="transparent" shadow={false}>
            <CardHeader
                floated={false}
                color="gray"
                className="mx-0 mt-0 mb-4 h-64 xl:h-40"
            >
                <img
                    src={product.pic}
                    className="h-full w-full object-cover"
                />
            </CardHeader>
            <CardBody className="py-0 px-1">
                <Typography
                    variant="small"
                    className="font-normal text-blue-gray-500"
                >
                    ${product.price}
                </Typography>
                <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mt-1 mb-2"
                >
                    {product.nameProduct}
                </Typography>
                <Typography
                    variant="small"
                    className="font-normal text-blue-gray-500"
                >
                    {singleCategory?.nameCategory}
                </Typography>
            </CardBody>
            <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                <Link to={`/auth/detail/${product._id}`}>
                    <Button variant="outlined" size="sm">
                        view detail
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}

export default ProductList
