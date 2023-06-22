import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { adminActions } from "../../store/adminSlice";

import { CSidebar, CSidebarBrand, CSidebarNav } from "@coreui/react";

import { AppSidebarNav } from "./AppSidebarNav";

import Logo from "../../../assets/logo/Logo.webp";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

// sidebar nav config
import navigation from "../_nav";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.admin.sidebarShow);

  return (
    <CSidebar
      position="fixed"
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(adminActions.set({ sidebarShow: visible }));
      }}
    >
      {/*  <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <img
          src={Logo}
          alt="logo_image"
          height={100}
          width={100}
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
        />
        <div className="d-inline slogan">
          <span>Tastes like home.. </span>
          <br />
          <span className="m-1">Feels like home</span>
        </div>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
