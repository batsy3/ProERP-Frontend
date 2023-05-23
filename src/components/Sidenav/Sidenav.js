import {
  CheckOutlined,
  FileDoneOutlined,
  FileOutlined,
  FileSyncOutlined,
  FundOutlined,
  HomeOutlined,
  InboxOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
  SettingOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import Logo from "../../assets/images/navBarLogo.png";
import User from "../../assets/images/Avatar.png";
import styled from "styled-components";
import { Menu, Avatar, Space, Typography } from "antd";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidenav.module.css";
import { useDispatch, useSelector } from "react-redux";

const Test = ({ color, isCollapsed }) => {
  const user = localStorage.getItem("user");
  const menu = [
    {
      label: (
        <NavLink to="/dashboard">
          <span>Dashboard</span>
        </NavLink>
      ),
      key: "dashboard",
      icon: <HomeOutlined />,
    },
    {
      label: "SERVICES",
      key: "Services",
      icon: <ShopOutlined />,
      children: [
        {
          label: (
            <NavLink to="/Services">
              <span>Services</span>
            </NavLink>
          ),
          key: "Services",
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <NavLink to="/service-category">
              <span>Services Category</span>
            </NavLink>
          ),
          key: "ServicesCategory",
          icon: <UnorderedListOutlined />,
        },
      ],
    },
    {
      label: "EXPENDITURE",
      key: "ExpenditureSection",
      icon: <PlusSquareOutlined />,
      children: [
        {
          label: (
            <NavLink to="/supplier">
              <span>Vendors</span>
            </NavLink>
          ),
          key: "suppliers",
          icon: <UserOutlined />,
        },
        {
          label: (
            <NavLink to="/Procurement">
              <span>New Expenditure</span>
            </NavLink>
          ),
          key: "newProcurement",
          icon: <CheckOutlined />,
        },
        {
          label: (
            <NavLink to="/Procurementlist">
              <span>Expenditure List</span>
            </NavLink>
          ),
          key: "ProcurementList",
          icon: <UnorderedListOutlined />,
        },
      ],
    },
    {
      label: "REVENUE",
      key: "saleSection",
      icon: <MinusSquareOutlined />,
      children: [
        {
          label: (
            <NavLink to="/customer">
              <span>Customers</span>
            </NavLink>
          ),
          key: "customers",
          icon: <UserOutlined />,
        },
        {
          label: (
            <NavLink to="/sale">
              <span>POS</span>
            </NavLink>
          ),
          key: "newSale",
          icon: <CheckOutlined />,
        },
        {
          label: (
            <NavLink to="/billing">
              <span>Billing</span>
            </NavLink>
          ),
          key: "billing",
          icon: <CheckOutlined />,
        },
      ],
    },
    {
      label: "ACCOUNTS",
      key: "accountSection",
      icon: <InboxOutlined />,
      children: [
        {
          label: (
            <NavLink to="/account/">
              <span>Chart of Accounts</span>
            </NavLink>
          ),
          key: "accountList",
          icon: <UnorderedListOutlined />,
        },
        {
          label: (
            <NavLink to="/transaction/create">
              <span>New Transaction</span>
            </NavLink>
          ),
          key: "newTransaction",
          icon: <CheckOutlined />,
        },
        {
          label: (
            <NavLink to="/transaction/">
              <span>Transaction List</span>
            </NavLink>
          ),
          key: "transactionList",
          icon: <UnorderedListOutlined />,
        },
      ],
    },
    {
      label: "REPORT",
      key: "reportSection",
      icon: <FundOutlined />,
      children: [
        {
          label: (
            <NavLink to="/account/trial-balance">
              <span>Trial Balance</span>
            </NavLink>
          ),
          key: "trialBalance",
          icon: <FileDoneOutlined />,
        },
        {
          label: (
            <NavLink to="/account/balance-sheet">
              <span>Balance Sheet</span>
            </NavLink>
          ),
          key: "balanceSheet",
          icon: <FileOutlined />,
        },
        {
          label: (
            <NavLink to="/account/income">
              <span>Income Statement</span>
            </NavLink>
          ),
          key: "incomeStatement",
          icon: <FileSyncOutlined />,
        },
        {
          label: (
            <NavLink to="/salelist">
              <span>POS</span>
            </NavLink>
          ),
          key: "saleList",
          icon: <UnorderedListOutlined />,
        },
      ],
    },

    {
      label: "HR",
      key: "hrSection",
      icon: <UserOutlined />,
      children: [
        {
          label: (
            <NavLink to="/hr/staffs">
              <span>Staffs</span>
            </NavLink>
          ),
          key: "staffs",
          icon: <UsergroupAddOutlined />,
        },
        {
          label: (
            <NavLink to="/hr/employees">
              <span>Employees</span>
            </NavLink>
          ),
          key: "Employees",
          icon: <UsergroupAddOutlined />,
        },
        {
          label: (
            <NavLink to="/role">
              <span>Role & Permissions</span>
            </NavLink>
          ),
          key: "roleAndPermissions",
          icon: <UserSwitchOutlined />,
        },
        {
          label: (
            <NavLink to="/designation/">
              <span>Designation</span>
            </NavLink>
          ),
          key: "designation",
          icon: <UserSwitchOutlined />,
        },
      ],
    },
    {
      label: (
        <NavLink to="/pos">
          <span>POS</span>
        </NavLink>
      ),
      key: "pos",
      icon: <ShoppingCartOutlined />,
    },

    {
      label: "SETTINGS",
      key: "settings",
      icon: <SettingOutlined />,
      children: [
        {
          label: (
            <NavLink to="/invoice-setting">
              <span>Invoice Settings</span>
            </NavLink>
          ),
          key: "invoiceSetting",
          icon: <SettingOutlined />,
        },
      ],
    },
  ];
  const { Text, Title } = Typography;
  return (
    <div
      style={{
        marginTop: isCollapsed ? 150 : 0,
        maxHeight: "100%",
      }}
    >
      <Space
        wrap
        hidden={isCollapsed}
        size={16}
        direction="vertical"
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          marginBottom: 30,
        }}
      >
        <img
          src={Logo}
          alt=""
          hidden={isCollapsed}
          style={{
            marginTop: 20,
            marginBottom: 20,
          }}
        />
        <Avatar size={56} src={User} />
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            fontSize: 20,
          }}
        >
          {user}
        </div>
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            fontSize: 10,
            color: "lightgrey",
          }}
        >
          Assistant
        </div>
      </Space>
      <Menu
        theme="dark"
        mode="inline"
        items={menu}
        style={{ backgroundColor: "#112D63" }}
      />
    </div>
  );
};

export default Test;
