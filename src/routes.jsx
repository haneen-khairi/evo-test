//layouts
import AuthGuard from "./guards/authGuard.jsx";
import AuthLayout from "./layouts/auth";
import DashboardLayout from "./layouts/dashboard";
//pages
import LoginForm from "./pages/auth/loginform.jsx";
import ForgotPasswordWrapper from "./pages/auth/ForgotPasswordWrapper.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";
import Home from "./pages/home";
import Requests from "./pages/request/index.jsx";
import Organization from "./pages/organization/index.jsx";
import AuditLog from "./pages/auditlog/index.jsx";
import PublicTable from "./pages/request/publictable.jsx";
import InviteDetails from "./pages/request/details.jsx";
import UserProfile from "./pages/user/index.jsx";
import Settings from "./pages/settings/index.jsx";
import Restaurant from "./pages/restaurant/index.jsx";
import AllNotifications from "./pages/notifications/index.jsx";
//Create Routes
import CreateDepartment from "./pages/organization/departments/create.jsx";
import CreateRequest from "./pages/request/createRequest";
import CreateBuilding from "./pages/organization/buildings/create.jsx";
import CreateRoom from "./pages/organization/rooms/create.jsx";
import CreateEmployee from "./pages/organization/employees/create.jsx";
import CreateGuest from "./pages/organization/guests/create.jsx";
import RestaurantCategories from "./pages/restaurant/RestaurantCategories.jsx";
import RestaurantProduct from "./pages/restaurant/RestaurantProduct.jsx";
import NewOrder from "./pages/restaurant/newOrder.jsx";
import MyOrders from "./pages/restaurant/myOrders.jsx";
import Orders from "./pages/restaurant/orders";
import Categories from "./pages/restaurant/categories";
import Products from "./pages/restaurant/products";

//Edut Routes
import EditBuilding from "./pages/organization/buildings/edit.jsx";
import EditGuest from "./pages/organization/guests/edit.jsx";

//New Pattern
import PublicInvite from "./pages/request/bylink.jsx";

//icons
import { RxDashboard } from "react-icons/rx";
import { LuCalendarClock, LuBuilding } from "react-icons/lu";
import { FaClockRotateLeft } from "react-icons/fa6";
import { FaGear } from "react-icons/fa6";

//misc
import { Navigate } from "react-router-dom";
import RegisterForm from "./pages/auth/RegisterForm.jsx";
import GuestHistory from "./pages/request/GuestHistory.jsx";
const routes = [
  {
    path: "/auth",
    inNavbar: false,
    isPrivate: false,
    element: (
      <AuthGuard isPublic>
        <AuthLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "register",
        element: <RegisterForm />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordWrapper />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "/",
    inNavbar: false,
    isPrivate: true,
    element: (
      <AuthGuard isPrivate>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "/dashboard",
        inNavbar: true,
        name: "dashboard",
        element: <Home />,
        icon: <RxDashboard />,
        permissions: ["Requests", "Administrator", "Restaurant"],
      },
      {
        path: "/requests",
        inNavbar: true,
        name: "requests",
        permissions: ["Requests"],
        element: <Requests />,
        icon: <LuCalendarClock />,
      },
      {
        key: "request-details",
        hash: "request-details",
        path: "/request/:id",
        inNavbar: false,
        hasSidebar: false,
        element: <InviteDetails />,
        permissions: ["Requests"],
      },
      {
        key: "guest-history",
        hash: "guest-history",
        path: "/guest-history",
        inNavbar: false,
        hasSidebar: false,
        element: <GuestHistory />,
        permissions: ["Requests"],
      },
      {
        path: "/create-invite",
        inNavbar: false,
        hasSidebar: false,
        element: <CreateRequest />,
        icon: <LuCalendarClock />,
        permission: ["Requests"],
      },
      {
        path: "/edit-invite/:id",
        inNavbar: false,
        hasSidebar: false,
        element: <CreateRequest />,
        icon: <LuCalendarClock />,
        permission: ["Requests"],
      },
      {
        path: "/organization",
        inNavbar: true,
        name: "organization",
        hasSidebar: false,
        element: <Organization />,
        icon: <LuBuilding />,
        permissions: ["Administrator"],
      },
      {
        path: "/settings",
        inNavbar: true,
        name: "settings",
        hasSidebar: false,
        element: <Settings />,
        icon: <FaGear />,
        permissions: ["Administrator"],
      },
      {
        path: "/create-department",
        inNavbar: false,
        hasSidebar: false,
        element: <CreateDepartment />,
      },
      {
        path: "/create-building",
        inNavbar: false,
        hasSidebar: false,
        element: <CreateBuilding />,
      },
      {
        path: "/edit-building/:id",
        inNavbar: false,
        hasSidebar: false,
        element: <EditBuilding />,
      },
      {
        path: "/create-room",
        inNavbar: false,
        hasSidebar: false,
        element: <CreateRoom />,
      },
      {
        path: "/create-employee",
        inNavbar: false,
        hasSidebar: false,
        element: <CreateEmployee />,
      },
      {
        path: "/create-guest",
        inNavbar: false,
        hasSidebar: false,
        element: <CreateGuest />,
      },
      {
        path: "/edit-guest/:id",
        inNavbar: false,
        hasSidebar: false,
        element: <EditGuest />,
      },
      {
        path: "/restaurant",
        inNavbar: true,
        name: "restaurant",
        hasSidebar: false,
        element: <Restaurant />,
        permissions: [
          "Restaurant",
          "Administrator",
          "Security",
          "Reception",
          "Employee",
        ],
        children: [
          {
            path: "new-order",
            inNavbar: false,
            hasSidebar: false,
            element: <NewOrder />,
            permissions: ["Restaurant"],
          },
          {
            path: "my-orders",
            inNavbar: false,
            hasSidebar: false,
            element: <MyOrders />,
            permissions: ["Restaurant"],
          },
          {
            path: "orders",
            inNavbar: false,
            hasSidebar: false,
            element: <Orders />,
            permissions: ["Restaurant"],
          },
          {
            path: "products",
            inNavbar: false,
            hasSidebar: false,
            element: <Products />,
            permissions: ["Restaurant"],
          },
          {
            path: "categories",
            inNavbar: false,
            hasSidebar: false,
            element: <Categories />,
            permissions: ["Restaurant"],
          },
        ],
      },
      {
        path: "/restaurant/create-category",
        inNavbar: false,
        hasSidebar: false,
        element: <RestaurantCategories />,
      },
      {
        path: "/restaurant/edit-category/:id",
        inNavbar: false,
        hasSidebar: false,
        element: <RestaurantCategories />,
      },
      {
        path: "/restaurant/create-product",
        inNavbar: false,
        hasSidebar: false,
        element: <RestaurantProduct />,
      },
      {
        path: "/restaurant/edit-product/:id",
        inNavbar: false,
        hasSidebar: false,
        element: <RestaurantProduct />,
      },
      {
        path: "/audit-log",
        inNavbar: false,
        name: "auditLog",
        hasSidebar: false,
        element: <AuditLog />,
        icon: <FaClockRotateLeft />,
        permissions: ["AuditLogs"],
      },
      {
        path: "/profile",
        inNavbar: false,
        name: "profile",
        hasSidebar: false,
        element: <UserProfile />,
        icon: <FaClockRotateLeft />,
      },
      {
        path: "/settings",
        inNavbar: false,
        name: "settings",
        hasSidebar: false,
        element: <Settings />,
      },
      {
        path: "/notifications",
        inNavbar: false,
        name: "notifications",
        hasSidebar: false,
        element: <AllNotifications />,
      },
    ],
  },
  {
    path: "/invite/bylink",
    element: <PublicInvite />,
    isPrivate: false,
    inNavbar: false,
  },
  {
    path: "/publictable",
    element: <PublicTable />,
    inNavbar: false,
    isPrivate: false,
  },
];

export default routes;
