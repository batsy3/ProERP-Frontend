import { Affix, Drawer, Layout } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidenav from "../Sidenav/Sidenav";
import Footer from "./Footer";
import Header from "./Header";
import styles from "./Main.module.css";

const { Header: AntHeader, Content, Sider } = Layout;

function Main({ children }) {
  const [collapsed, setCollapsed] = useState(true);

  const handleCollapsed = (val) => {
    setCollapsed(val);
  };

  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [sidenavColor, setSidenavColor] = useState("#112D63");
  const [sidenavType, setSidenavType] = useState("transparent");
  const [fixed, setFixed] = useState(false);

  const openDrawer = () => setVisible(!visible);
  const handleSidenavType = (type) => setSidenavType(type);
  const handleSidenavColor = (color) => setSidenavColor(color);
  const handleFixedNavbar = (type) => setFixed(type);

  let { pathname } = useLocation();
  pathname = pathname.replace("/", " ");

  useEffect(() => {
    if (pathname === "rtl") {
      setPlacement("left");
    } else {
      setPlacement("right");
    }
  }, [pathname]);

  const isLogged = Boolean(localStorage.getItem("isLogged"));

  return (
    <Layout className={styles.mainLayout}>
      {isLogged && (
        <Drawer
          title={false}
          placement={placement === "right" ? "left" : "right"}
          closable={false}
          key={placement === "right" ? "left" : "right"}
          width={220}
        >
          <Layout>
            <Sidenav color={sidenavColor} isCollapsed={collapsed} />
          </Layout>
        </Drawer>
      )}
      {isLogged && (
          <Sider
            breakpoint="lg"
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={240}
            theme="light"
            style={{
              paddingTop: 40,
              backgroundColor: "#112D63",
              padding: 20,
              transition: "ease-in",
              position: "relative",
              marginBottom:0
            }}
          >
            {isLogged && (
              <Sidenav color={sidenavColor} isCollapsed={collapsed} />
            )}
          </Sider>
      )}
      <Layout
        className={
          isLogged
            ? collapsed
              ? styles.mainLayoutUncollapse
              : styles.mainLayoutCollapse
            : styles.mainLayoutMarginLeftZero
        }
      >
        {isLogged && (
          <Affix>
            <AntHeader>
              <Header
                onPress={openDrawer}
                name={pathname}
                subName={pathname}
                handleSidenavColor={handleSidenavColor}
                handleSidenavType={handleSidenavType}
                handleFixedNavbar={handleFixedNavbar}
                collapsed={collapsed}
                handleCollapsed={handleCollapsed}
                isLogged={isLogged}
              />
            </AntHeader>
          </Affix>
        )}
        <Content>{children}</Content>
        <Footer />
      </Layout>
    </Layout>
  );
}

export default Main;
