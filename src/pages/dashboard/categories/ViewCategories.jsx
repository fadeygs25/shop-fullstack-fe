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
import { useMaterialTailwindController, setOpenAddCategory, setOpenEditCategory } from "@/context";
import { useCategories } from "@/store/context/CategoryContext";
import { AddCategory, EditCategory } from "@/widgets/side-category";
import { toast } from 'react-toastify';

export function ViewCategories() {
    const [controller, dispatch] = useMaterialTailwindController();
    const { categories, getCategories, deleteCategory,
        toasts, clearErrors, getCategoryById
    } = useCategories();

    React.useEffect(() => {
        getCategories()
    }, [])



    return (

        <div className="mt-12 mb-8 flex flex-col gap-12">
            <AddCategory />
            <EditCategory />
            <div className="px-6">
                <Button variant="gradient"
                    onClick={() => setOpenAddCategory(dispatch, true)}
                >
                    add category
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
                                {["categories", "", ""].map((el) => (
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
                            {categories.map(
                                ({ _id, nameCategory }, key) => {
                                    const className = `py-3 px-5 ${key === categories.length - 1
                                        ? ""
                                        : "border-b border-blue-gray-50"
                                        }`;

                                    return (
                                        <tr key={nameCategory}>
                                            <td className={className}>
                                                <div className="flex items-center gap-4">
                                                    <div>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-semibold"
                                                        >
                                                            {nameCategory}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={className}>
                                                <Typography
                                                    as="a"
                                                    onClick={() => {
                                                        setOpenEditCategory(dispatch, true);
                                                        getCategoryById(_id)
                                                    }}
                                                    className="text-xs font-semibold text-blue-gray-600"
                                                >
                                                    Edit
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography
                                                    as="a"
                                                    href="#"
                                                    className="text-xs font-semibold text-blue-gray-600"
                                                    onClick={() => {
                                                        deleteCategory(_id);
                                                    }}
                                                >
                                                    Delete
                                                </Typography>
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </table>
                </CardBody>
            </Card>

        </div>
    );
}

export default ViewCategories