import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import DetailsSup from "./components/suppliers/detailsSup";
import Suppliers from "./components/suppliers/suppliers";
import UpdateSup from "./components/suppliers/updateSup";

import DetailsProd from "./components/Service/detailsProd";
import Product from "./components/Service/service";
import UpdateProd from "./components/Service/updateProd";

import DetailsPurch from "./components/purchase/detailsPurch";
import Purchase from "./components/purchase/purchase";

import Login from "./components/user/Login";
import Logout from "./components/user/Logout";
import UserList from "./components/user/user";

import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Customer from "./components/customer/customer";
import DetailCust from "./components/customer/detailCust";
import UpdateCust from "./components/customer/updateCust";
import Pos from "./components/pos/pos";
import DetailSale from "./components/sale/detailSale";
import Sale from "./components/sale/sale";

import Page404 from "./components/404/404Page";
import Dashboard from "./components/Dashboard/Graph/Dashboard";
import AddCustPaymentByInvoice from "./components/Payment/CustomerPaymentByInvoice";
import AddSupPaymentByInvoice from "./components/Payment/SupplierPaymentByInvoice";
import GetAllPurch from "./components/purchase/getAllPurch";
import GetAllSale from "./components/sale/getAllSale";
import DetailStaff from "./components/user/detailsStaff";
import UpdateStaff from "./components/user/updateStaff";

// import Register from "./components/user/Register";
import { Layout } from "antd";
import Account from "./components/account/account";
import BalanceSheet from "./components/account/balanceSheet";
import DetailAccount from "./components/account/detailAccount";
import IncomeStatement from "./components/account/incomeStatement";
import TrialBalance from "./components/account/trialBalance";
import Designation from "./components/designation/designation";
import DetailDesignation from "./components/designation/detailDesignation";
import UpdateDesignation from "./components/designation/updateDesignation";
import Main from "./components/layouts/Main";
import DetailProductCategory from "./components/ServiceCategory/detailProductCategory";
import ProductCategory from "./components/ServiceCategory/productCategory";
import UpdateProductCategory from "./components/ServiceCategory/updateProductCategory";
import AddReturnPurchase from "./components/purchase/addReturnPurchase";
import AddPermission from "./components/role/AddPermission";
import DetailRole from "./components/role/DetailsRole";
import RoleList from "./components/role/role";
import AddReturnSale from "./components/sale/addReturnSale";
import InvoiceSetting from "./components/settings/invoiceSetting";
import AddTransaction from "./components/transaction/AddTransaction";
import DetailTransaction from "./components/transaction/detailTransaction";
import Transaction from "./components/transaction/transaction";
const { Sider } = Layout;

function App() {
  return (
    <div className="App container-fluid">
      <BrowserRouter>
        <Main>
          <ToastContainer />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<Page404 />} />

            <Route path="/supplier" exact element={<Suppliers />} />
            <Route path="/supplier/:id" element={<DetailsSup />} />
            <Route path="/supplier/:id/update" element={<UpdateSup />} />

            <Route path="/Services" exact element={<Product />} />
            <Route path="/Services/:id" element={<DetailsProd />} />
            <Route path="/Services/:id/update" element={<UpdateProd />} />

            <Route
              path="/service-category"
              exact
              element={<ProductCategory />}
            />
            <Route
              path="/service-category/:id"
              element={<DetailProductCategory />}
            />
            <Route
              path="/service-category/:id/update"
              element={<UpdateProductCategory />}
            />

            <Route path="/Procurement" exact element={<Purchase />} />
            <Route path="/Procurementlist" exact element={<GetAllPurch />} />
            <Route path="/Procurement/:id" element={<DetailsPurch />} />
            <Route
              path="/Procurement/return/:id"
              element={<AddReturnPurchase />}
            />

            <Route path="/customer" exact element={<Customer />} />
            <Route path="/customer/:id" element={<DetailCust />} />
            <Route path="/customer/:id/update" element={<UpdateCust />} />

            <Route path="/sale" exact element={<Sale />} />
            <Route path="/salelist" exact element={<GetAllSale />} />
            <Route path="/sale/:id" element={<DetailSale />} />
            <Route path="/sale/:id/update" element={<UpdateProd />} />
            <Route path="/sale/return/:id" element={<AddReturnSale />} />
            <Route
              path="/payment/supplier/:pid"
              exact
              element={<AddSupPaymentByInvoice />}
            />
            <Route
              path="/payment/customer/:pid"
              exact
              element={<AddCustPaymentByInvoice />}
            />
            <Route path="/transaction" exact element={<Transaction />} />
            <Route
              path="/transaction/create"
              exact
              element={<AddTransaction />}
            />
            <Route path="/transaction/:id" element={<DetailTransaction />} />

            <Route path="/auth/login" exact element={<Login />} />
            <Route path="/auth/logout" exact element={<Logout />} />
            {/*         <Route path='/auth/register' exact element={<Register />} /> */}
            <Route path="/hr/staffs" exact element={<UserList />} />
            <Route path="/hr/staffs/:id" exact element={<DetailStaff />} />
            <Route path="/hr/staffs/:id/update" element={<UpdateStaff />} />
            <Route path="/hr/employees" exact element={<UserList />} />
            <Route path="/hr/employees/:id" exact element={<DetailStaff />} />
            <Route path="/hr/employees/:id/update" element={<UpdateStaff />} />

            <Route path="/role" exact element={<RoleList />} />
            <Route path="/role/:id" element={<DetailRole />} />
            <Route path="/role/permit/:id/" element={<AddPermission />} />

            <Route path="/account" exact element={<Account />} />
            <Route path="/account/:id" element={<DetailAccount />} />
            <Route
              path="/account/trial-balance"
              exact
              element={<TrialBalance />}
            />
            <Route
              path="/account/balance-sheet"
              exact
              element={<BalanceSheet />}
            />
            <Route path="/account/income" exact element={<IncomeStatement />} />
            <Route path="/designation" exact element={<Designation />} />
            <Route path="/designation/:id" element={<DetailDesignation />} />
            <Route
              path="/designation/:id/update"
              element={<UpdateDesignation />}
            />

            <Route path="/pos" exact element={<Pos />} />

            <Route path="/invoice-setting" exact element={<InvoiceSetting />} />
          </Routes>
        </Main>
      </BrowserRouter>
    </div>
  );
}

export default App;
