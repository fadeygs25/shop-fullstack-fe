import React from "react";
import PropTypes from "prop-types";

export const MaterialTailwind = React.createContext(null);
MaterialTailwind.displayName = "MaterialTailwindContext";

export function reducer(state, action) {
  switch (action.type) {
    case "OPEN_SIDENAV": {
      return { ...state, openSidenav: action.value };
    }
    case "SIDENAV_TYPE": {
      return { ...state, sidenavType: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "OPEN_ADD_PRODUCT": {
      return { ...state, openAddProduct: action.value };
    }
    case "OPEN_EDIT_PRODUCT": {
      return { ...state, openEditProduct: action.value };
    }
    case "OPEN_ADD_CATEGORY": {
      return { ...state, openAddCategory: action.value };
    }
    case "OPEN_EDIT_CATEGORY": {
      return { ...state, openEditCategory: action.value };
    }
    case "OPEN_EDIT_PROFILE": {
      return { ...state, openEditProfile: action.value };
    }
    case "OPEN_EDIT_USER": {
      return { ...state, openEditUser: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function MaterialTailwindControllerProvider({ children }) {
  const initialState = {
    openSidenav: false,
    sidenavColor: "blue",
    sidenavType: "dark",
    transparentNavbar: true,
    fixedNavbar: false,
    openConfigurator: false,
    openAddProduct: false,
    openEditProduct: false,
    openAddCategory: false,
    openEditCategory: false,
    openEditProfile: false,
    openEditUser: false,
  };

  const [controller, dispatch] = React.useReducer(reducer, initialState);
  const value = React.useMemo(
    () => [controller, dispatch],
    [controller, dispatch]
  );

  return (
    <MaterialTailwind.Provider value={value}>
      {children}
    </MaterialTailwind.Provider>
  );
}

export function useMaterialTailwindController() {
  const context = React.useContext(MaterialTailwind);

  if (!context) {
    throw new Error(
      "useMaterialTailwindController should be used inside the MaterialTailwindControllerProvider."
    );
  }

  return context;
}

MaterialTailwindControllerProvider.displayName = "/src/context/index.jsx";

MaterialTailwindControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const setOpenSidenav = (dispatch, value) =>
  dispatch({ type: "OPEN_SIDENAV", value });
export const setSidenavType = (dispatch, value) =>
  dispatch({ type: "SIDENAV_TYPE", value });
export const setSidenavColor = (dispatch, value) =>
  dispatch({ type: "SIDENAV_COLOR", value });
export const setTransparentNavbar = (dispatch, value) =>
  dispatch({ type: "TRANSPARENT_NAVBAR", value });
export const setFixedNavbar = (dispatch, value) =>
  dispatch({ type: "FIXED_NAVBAR", value });
export const setOpenConfigurator = (dispatch, value) =>
  dispatch({ type: "OPEN_CONFIGURATOR", value });
export const setOpenAddProduct = (dispatch, value) =>
  dispatch({ type: "OPEN_ADD_PRODUCT", value });
export const setOpenEditProduct = (dispatch, value) =>
  dispatch({ type: "OPEN_EDIT_PRODUCT", value });
export const setOpenAddCategory = (dispatch, value) =>
  dispatch({ type: "OPEN_ADD_CATEGORY", value });
export const setOpenEditCategory = (dispatch, value) =>
  dispatch({ type: "OPEN_EDIT_CATEGORY", value });
export const setOpenEditProfile = (dispatch, value) =>
  dispatch({ type: "OPEN_EDIT_PROFILE", value });
export const setOpenEditUser = (dispatch, value) =>
  dispatch({ type: "OPEN_EDIT_USER", value });
