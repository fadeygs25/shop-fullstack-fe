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
  Input,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
  ClockIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";
import { platformSettingsData, conversationsData, projectsData } from "@/data";
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from "@/store/context/ProductContext";
import { toast } from 'react-toastify';
import { useCategories } from "@/store/context/CategoryContext";
import { useRatings } from "@/store/context/RatingContext";
import Ratings from "./Ratings";
import Rating from '@mui/material/Rating';
import { useUsers } from "@/store/context/UserContext";
import moment from 'moment';
import { useCarts } from "@/store/context/CartContext";

export function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { productsById, getProductById } = useProducts();

  const { categoriesById, getCategoryById } = useCategories();

  const { createRating, getRatingByProduct, ratingsByProduct } = useRatings();

  const { createCart, toasts, clearErrors } = useCarts();


  const [myRatings, setMyRatings] = React.useState([]);
  const [singleCategory, setSingleCategory] = React.useState(null);
  const [newRating, setNewRating] = React.useState({
    productId: id,
    start: '',
    message: '',
    date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
  });
  const newCart = {
    productId: id,
    price: productsById?.price,
  }


  React.useEffect(() => {
    if (toasts) {
      toasts.forEach(ele => {
        toast(ele.message, {
          type: ele.type
        })
      });
      clearErrors()
    }
  }, [toasts, clearErrors])


  // product
  React.useEffect(() => {
    getProductById(id);
  }, [
    id
  ]);

  // category
  React.useEffect(() => {
    if (!singleCategory) {
      getCategoryById(productsById?.categoryId)
    }

    if (categoriesById?._id === productsById?.categoryId) {
      setSingleCategory(categoriesById)
    }
  }, [
    categoriesById, productsById?.categoryId, getCategoryById
  ]);

  // rating
  React.useEffect(() => {
    getRatingByProduct(id);
  }, [id]);




  const handleRating = () => {
    const { start, message } = newRating
    if (!start || !message) {
      toast('Please fill all the fields', { type: 'error' })
      return
    }

    createRating(newRating)
  }



  const handleAddCart = () => {
    if (newCart.productId.length > 0) {
      createCart(newCart);
    } else {
      toast('Please provide a blog title and content', { type: 'error' })
    }
  }


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
            <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-1 xl:grid-cols-2">
              <Card key={productsById?.nameProduct} color="transparent" shadow={false}>
                <CardHeader
                  floated={false}
                  color="gray"
                  className="mx-0 mt-0 mb-4 h-64 xl:h-80"
                >
                  <img
                    src={productsById?.pic}
                    className="h-full w-full object-cover"
                  />
                </CardHeader>

              </Card>
              <CardBody className="py-0 px-1">
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  ${productsById?.price}
                </Typography>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="mt-1 mb-2"
                >
                  {productsById?.nameProduct}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-500"
                >
                  {singleCategory?.nameCategory}
                </Typography>
                <Link >
                  <Button onClick={handleAddCart} variant="outlined" size="sm">
                    Add Card
                  </Button>
                </Link>
              </CardBody>

            </div>
          </div>
          <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <Card className="overflow-hidden xl:col-span-2 ">
              <CardBody className="overflow-x-scroll px-0 pt-0 pb-2 p-5 w-full">
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Ratings
                </Typography>
                <ul className="flex flex-col gap-6 h-96 ">

                  {
                    ratingsByProduct.map((rating) => (
                      <Ratings key={rating.id} rating={rating} />
                    ))
                  }
                </ul>

              </CardBody>
              <div className="py-3 px-5 ">

                <div className="text-center">

                  <Rating
                    name="simple-controlled"
                    onChange={(e) => setNewRating({ ...newRating, start: e.target.value })}
                  />
                </div>
                <Input label="Rating" size="lg"
                  onChange={(e) => setNewRating({ ...newRating, message: e.target.value })}
                />
                <Button onClick={handleRating} variant="gradient" fullWidth>
                  Submit
                </Button>
              </div>

            </Card>
            <Card>
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 p-6"
              >
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Orders Overview
                </Typography>
                <Typography
                  variant="small"
                  className="flex items-center gap-1 font-normal text-blue-gray-600"
                >
                  <ArrowUpIcon
                    strokeWidth={3}
                    className="h-3.5 w-3.5 text-green-500"
                  />
                  <strong>24%</strong> this month
                </Typography>
              </CardHeader>
              <CardBody className="pt-0">
                {ordersOverviewData.map(
                  ({ icon, color, title, description }, key) => (
                    <div key={title} className="flex items-start gap-4 py-3">
                      <div
                        className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${key === ordersOverviewData.length - 1
                          ? "after:h-0"
                          : "after:h-4/6"
                          }`}
                      >
                        {React.createElement(icon, {
                          className: `!w-5 !h-5 ${color}`,
                        })}
                      </div>
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="block font-medium"
                        >
                          {title}
                        </Typography>
                        <Typography
                          as="span"
                          variant="small"
                          className="text-xs font-medium text-blue-gray-500"
                        >
                          {description}
                        </Typography>
                      </div>
                    </div>
                  )
                )}
              </CardBody>
            </Card>
          </div>
        </CardBody>
      </Card >
    </>
  );
}

export default Detail;
