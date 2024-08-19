import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  BriefcaseIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  TagIcon,
  ChatBubbleBottomCenterIcon,
  ChartBarIcon,
  ShoppingCartIcon,
  DeviceTabletIcon,
  ClipboardDocumentCheckIcon,
  ExclamationCircleIcon

} from "@heroicons/react/24/solid";
import {
  Home, Profile, Tables, Notifications,
  ViewProducts, ViewCategories, ViewUsers,
  ViewOrders, ViewComments, ViewComment, ViewStatistical
} from "@/pages/dashboard";
import {
  SignIn, SignUp, ProductLists,
  Detail, Carts, Checkout,
  ProfileAuth, PayPal

} from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  // {
  //   layout: "dashboard",
  //   pages: [
  //     {
  //       icon: <HomeIcon {...icon} />,
  //       name: "home",
  //       path: "/home",
  //       element: <Home />,
  //     },
  //     {
  //       icon: <UserCircleIcon {...icon} />,
  //       name: "profile",
  //       path: "/profile",
  //       element: <Profile />,
  //     },
  //     {
  //       icon: <TableCellsIcon {...icon} />,
  //       name: "tables",
  //       path: "/tables",
  //       element: <Tables />,
  //     },
  //     {
  //       icon: <BellIcon {...icon} />,
  //       name: "notifactions",
  //       path: "/notifactions",
  //       element: <Notifications />,
  //     },
  //   ],
  // },
  {
    title: "admin",
    layout: "dashboard",
    pages: [
      {
        icon: <ChartBarIcon {...icon} />,
        name: "statistical",
        path: "/statistical",
        element: <ViewStatistical />,
      },
      {
        icon: <ShoppingCartIcon {...icon} />,
        name: "orders",
        path: "/view-orders",
        element: <ViewOrders />,
      },
      {
        icon: <ChatBubbleBottomCenterIcon {...icon} />,
        name: "comments",
        path: "/view-comments",
        element: <ViewComments />,
      },

      {
        icon: <TagIcon {...icon} />,
        name: "categories",
        path: "/view-categories",
        element: <ViewCategories />,
      },
      {
        icon: <BriefcaseIcon {...icon} />,
        name: "products",
        path: "/view-products",
        element: <ViewProducts />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "users",
        path: "/view-users",
        element: <ViewUsers />,
      },
      {
        icon: <ExclamationCircleIcon {...icon} />,
        name: "errors",
        path: "/view-comment/:id",
        element: <ViewComment />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Home",
        path: "/home",
        element: <ProductLists />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Profile",
        path: "/profile",
        element: <ProfileAuth />,
      },
      {
        icon: <DeviceTabletIcon {...icon} />,
        name: "Detail",
        path: "/detail/:id",
        element: <Detail />,
      },
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        icon: <ShoppingCartIcon {...icon} />,
        name: "Carts",
        path: "/carts",
        element: <Carts />,
      },
      {
        icon: <ClipboardDocumentCheckIcon {...icon} />,
        name: "Checkout",
        path: "/checkout",
        element: <Checkout />,
      },
      {
        icon: <ClipboardDocumentCheckIcon {...icon} />,
        name: "Paypal",
        path: "/paypal/:id",
        element: <PayPal />,
      },
    ],
  },
];

export default routes;