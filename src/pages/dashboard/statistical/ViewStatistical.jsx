import React from "react";
import {
    Typography,
    Card,
    CardHeader,
    CardBody,
    IconButton,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Tooltip,
    Progress,
} from "@material-tailwind/react";
import {
    ClockIcon,
    CheckIcon,
    EllipsisVerticalIcon,
    ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
    statisticsCardsData,
    statisticsChartsData,
    projectsTableData,
    ordersOverviewData,
} from "@/data";
import { useUsers } from "@/store/context/UserContext";
import {
    BanknotesIcon,
    UserPlusIcon,
    UserIcon,
    ChartBarIcon,
    ShoppingCartIcon,
    BriefcaseIcon,
    ChatBubbleBottomCenterIcon
} from "@heroicons/react/24/solid";
import { useOrders } from "@/store/context/OrderContext";
import { useProducts } from "@/store/context/ProductContext";
import { useRatings } from "@/store/context/RatingContext";

export function ViewStatistical() {
    const { countUsers, getCountUsers } = useUsers();
    const { countOrders, getCountOrders } = useOrders();
    const { countProducts, getCountProducts } = useProducts();
    const { countRatings, getCountRatings } = useRatings();
    const [users, setUsers] = React.useState(null)
    const [orders, setOrders] = React.useState(null)
    const [products, setProducts] = React.useState(null)
    const [ratings, setRatings] = React.useState(null)

    // users
    React.useEffect(() => {
        getCountUsers()
    }, [])

    React.useEffect(() => {
        setUsers(countUsers)
    }, [countUsers])


    // orders
    React.useEffect(() => {
        getCountOrders()
    }, [])

    React.useEffect(() => {
        setOrders(countOrders?.count)
    }, [countOrders?.count])

    // products
    React.useEffect(() => {
        getCountProducts()
    }, [])

    React.useEffect(() => {
        setProducts(countProducts)
    }, [countProducts])

    // ratings
    React.useEffect(() => {
        getCountRatings()
    }, [])

    React.useEffect(() => {
        setRatings(countRatings)
    }, [countRatings])




    return (
        <div className="mt-12">
            <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                <StatisticsCard
                    title="Today's Users"
                    color="pink"
                    value={users}
                    icon={React.createElement(UserPlusIcon, {
                        className: "w-6 h-6 text-white",
                    })}
                />
                <StatisticsCard
                    title="Sales"
                    color="blue"
                    value={orders}
                    icon={React.createElement(ShoppingCartIcon, {
                        className: "w-6 h-6 text-white",
                    })}
                />
                <StatisticsCard
                    title="Products"
                    color="green"
                    value={products}
                    icon={React.createElement(BriefcaseIcon, {
                        className: "w-6 h-6 text-white",
                    })}
                />
                <StatisticsCard
                    title="Ratings"
                    color="yellow"
                    value={ratings}
                    icon={React.createElement(ChatBubbleBottomCenterIcon, {
                        className: "w-6 h-6 text-white",
                    })}
                />
            </div>
        </div>
    );
}

export default ViewStatistical;
