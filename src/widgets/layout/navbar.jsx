
import React from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar as MTNavbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useUsers } from "@/store/context/UserContext";


export function Navbar({ brandName, routes, routesAdmin, action }) {
  const { currentUser, getProfile, logoutUser } = useUsers();
  const navigate = useNavigate();
  const [profile, setProfile] = React.useState({})

  React.useEffect(() => {
    if (!currentUser) {
      getProfile();
    }
  }, [currentUser])

  React.useEffect(() => {
    setProfile(currentUser)
  }, [currentUser])

  const handleLogout = () => {
    logoutUser();
    navigate('/auth/sign-in');
  }

  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {routes.map(({ name, path, icon }) => (
        <Typography
          key={name}
          as="li"
          variant="small"
          color="blue-gray"
          className="capitalize"
        >
          <Link to={path} className="flex items-center gap-1 p-1 font-normal">
            {icon &&
              React.createElement(icon, {
                className: "w-[18px] h-[18px] opacity-50 mr-1",
              })}
            {name}
          </Link>
        </Typography>
      ))}

      {
        routesAdmin.map(({ role, pages }) =>
          profile?.role === "admin" &&
          pages.map(({ name, path, icon }) =>
          (
            <Typography
              key={name}
              as="li"
              variant="small"
              color="blue-gray"
              className="capitalize"
            >
              <Link to={path} className="flex items-center gap-1 p-1 font-normal">
                {icon &&
                  React.createElement(icon, {
                    className: "w-[18px] h-[18px] opacity-50 mr-1",
                  })}
                {name}
              </Link>
            </Typography>
          ))
        )}
    </ul>
  );

  const profileList = (
    <>
      {
        profile ? (

          <Menu>
            <MenuHandler>
              <Button
                color="blue-gray"
                size="sm"
                className="flex items-center gap-3 text-base font-normal capitalize tracking-normal"
              >
                <Avatar
                  src={profile.pic}
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                {profile.username}
              </Button>


            </MenuHandler>
            <MenuList className="w-max border-0">
              <MenuItem className="flex items-center gap-4">
                <Button
                  onClick={handleLogout}
                  fullWidth>
                  Log out
                </Button>
              </MenuItem>
            </MenuList>
          </Menu>

        ) : (
          <Link to={"/auth/sign-in"}>
            <Button variant="gradient" size="sm" fullWidth>
              Sign in
            </Button>
          </Link>
        )
      }
    </>
  );

  return (
    <MTNavbar className="p-3">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Link to="/">
          <Typography
            variant="small"
            className="mr-4 ml-2 cursor-pointer py-1.5 font-bold"
          >
            {brandName}
          </Typography>
        </Link>
        <div className="hidden lg:block">{navList}</div>
        {/* {React.cloneElement(action, {
          className: "hidden lg:inline-block",
        })} */}
        <div className="hidden lg:inline-block">{profileList}</div>



        <IconButton
          variant="text"
          size="sm"
          className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          {profileList}
          {/* {React.cloneElement(action, {
            className: "w-full block lg:hidden",
          })} */}
        </div>
      </MobileNav>
    </MTNavbar >
  );
}

Navbar.defaultProps = {
  brandName: "Material Tailwind React",
  action: (
    <a
      href="https://www.creative-tim.com/product/material-tailwind-dashboard-react"
      target="_blank"
    >
      <Button variant="gradient" size="sm" fullWidth>
        free download
      </Button>
    </a>
  ),
};


Navbar.propTypes = {
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.node,
};

Navbar.displayName = "/src/widgets/layout/navbar.jsx";

export default Navbar;
