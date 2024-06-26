import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  InputNumber,
  Row,
  Input,
  Select,
  Typography,
} from "antd";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProduct } from "../../redux/actions/Services/getAllProductAction";
import { addSale } from "../../redux/actions/sale/addSaleAction";
import Serivce from "./services";

import moment, { months } from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { loadAllStaff } from "../../redux/actions/user/getStaffAction";
import { loadAllSale } from "../../redux/actions/sale/getSaleAction";
import { loadSingleCustomer } from "../../redux/actions/customer/detailCustomerAction";
import { createInvoice } from "../../redux/actions/Invoice/InvoiceAction";
import { updateBilling } from "../../redux/actions/billing/billing.actions";
import {
  loadAllCustomer,
  loadWalkInCustomer,
} from "../../redux/actions/customer/getCustomerAction";
import { isString, set } from "lodash";

const { Title } = Typography;

const AddSale = () => {
  const { Option } = Select;
  const [formData, setFormData] = useState({});
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const param = useParams();
  const onClickLoading = () => {
    setLoader(true);
  };
  const today = new moment();
  const [afterDiscount, setAfterDiscount] = useState(0);
  const dispatch = useDispatch();
  const user = localStorage.getItem("id");
  const customer = useSelector((state) => state.customers.customer);
  const allCustomer = useSelector((state) => state.customers.list);
  const allProducts = useSelector((state) => state.products.list);
  const allStaff = useSelector((state) => state.users.list);

  const [date, setDate] = useState(moment());
  const [customerId, setCustomerId] = useState(null);
  const [services, setServices] = useState(null);

  useEffect(() => {
    dispatch(loadSingleCustomer(param.id ? Number(param.id) : customerId));
    dispatch(loadAllCustomer());
    dispatch(loadProduct({ page: 1, limit: 10 }));
    dispatch(loadAllStaff({ status: "true" }));
    !param.id
      ? setServices(
          allProducts?.filter(
            (item) => item.service_category.name === "Non-Billable"
          )
        )
      : setServices(allProducts);
  }, []);

  useEffect(() => {
    dispatch(loadSingleCustomer(customerId)).then((res) => {
      console.log(customer);
      console.log({ res: res });
      setServices(
        res?.services.filter(
          (item) => item.service_category.name === "Non-Billable"
        )
      );
    });
  }, [customerId, setCustomerId]);

  useEffect(() => {
    dispatch(loadAllCustomer());
    dispatch(loadProduct({ page: 1, limit: 10 }));
  }, [dispatch]);

  const [salesPerson, setSalesPerson] = useState(null);

  // Form Function
  const [form] = Form.useForm();
  const [totalDiscountPaidDue, setTotalDiscountPaidDue] = useState({
    total: 0,
    discount: 0,
    afterDiscount: 0,
    paid: 0,
    due: 0,
  });

  const onFormSubmit = async (values) => {
    let billingArray = customer?.billing.map((item) => parseInt(item.id));
    try {
      setLoader(true);
      const data = {
        paid_amount: totalDiscountPaidDue.paid,
        init_amount_due: totalDiscountPaidDue.due,
        gross_amount_due: totalDiscountPaidDue.afterDiscount,
        discount: totalDiscountPaidDue.discount,
        user_id: Number(user),
        customer_id: Number(param.id),
        billing: billingArray,
      };
      const billingReceipt = await dispatch(createInvoice(data));

      const updatebillingData = {
        date: today.toISOString(),
        status: "PAID",
        last_paid: today.toISOString(),
        next_payment: today.add(1, "months").toISOString(),
        customer_id: Number(param.id),
        note: "paid",
        billing_receipt: billingReceipt.id,
        user_id: Number(user),
      };
      customer?.billing.forEach((element) => {
        dispatch(updateBilling(updatebillingData, element.id));
      });

      if ((billingReceipt.message && updateBilling.message) === "success") {
        setLoader(false);
        toast.success("created billing successfully");
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }

    // const saleInvoiceProduct = selectedProds.map((prod) => {
    //   return {
    //     product_id: prod.id,
    //     product_quantity: prod.selectedQty,
    //     product_sale_price: prod.sale_price,
    //   };
    // });

    // try {
    //   const valueData = {
    //     date: date,
    //     paid_amount: totalDiscountPaidDue.paid,
    //     discount: totalDiscountPaidDue.discount,
    //     customer_id: customer.id,
    //     user_id: salesPerson,
    //     saleInvoiceProduct,
    //   };
    //   const resp = await dispatch(createInvoice(valueData));

    //   if (resp.message === "success") {
    //     form.resetFields();
    //     setFormData({});
    //     setAfterDiscount(0);
    //     setLoader(false);
    //     dispatch(
    //       loadAllSale({
    //         page: 1,
    //         limit: "",
    //         startdate: moment().format("YYYY-MM-DD"),
    //         enddate: moment().format("YYYY-MM-DD"),
    //         user: "",
    //       })
    //     );
    //     navigate(`/sale/${resp.createdInvoiceId}`);
    //   } else {
    //     setLoader(false);
    //   }
    // } catch (error) {
    //   console.log(error.message);
    //   setLoader(false);
    //   toast.error("Error while sales");
    // }
  };

  const updateFormData = () => {
    const data = form.getFieldsValue();

    const total = data.saleInvoiceProduct?.reduce((acc, p) => {
      const { product_quantity = 0, product_sale_price = 0 } = p;
      acc += product_quantity * product_sale_price;
      return acc;
    }, 0);

    data.total = total;
    data.due = total - (data.paid_amount ?? 0) - (data.discount ?? 0);

    setFormData(data);
    if (data.discount) {
      setAfterDiscount(total - (data.discount ?? 0));
    }
    if (data.discount === 0) {
      setAfterDiscount(0);
    }
  };

  // Select Supplier Funciton
  const onChange = async (values) => {
    updateFormData();
  };

  const onSearch = (value) => {};

  // Products Handlers

  const [selectedProds, setSelectedProds] = useState([]);

  const handleSelectedProds = (prodId, key) => {
    const foundProd = allProducts.find((item) => item.id === prodId);
    // if (foundProd === undefined) {
    let updatedSelectedProds = [...selectedProds];
    if (selectedProds[key]) {
      updatedSelectedProds[key] = { ...foundProd, selectedQty: 1 };
      setSelectedProds(updatedSelectedProds);
    } else {
      setSelectedProds((prev) => [...prev, { ...foundProd, selectedQty: 1 }]);
    }

    // }
  };

  const handleSelectedProdsQty = (key, qty) => {
    const updatedSelectedProds = selectedProds.map((prod, index) => {
      let prodCopy;
      if (key === index) {
        prodCopy = { ...prod, selectedQty: qty };
      } else prodCopy = { ...prod };

      return prodCopy;
    });

    setSelectedProds(updatedSelectedProds);
  };

  const handleSelectedProdsSalePrice = (key, salePrice) => {
    const updatedSelectedProds = selectedProds.map((prod, index) => {
      let prodCopy;
      if (key === index) {
        prodCopy = { ...prod, sale_price: salePrice };
      } else prodCopy = { ...prod };

      return prodCopy;
    });
    setSelectedProds(updatedSelectedProds);
  };

  const handleDeleteProd = (key) => {
    if (selectedProds[key]) {
      const updatedProds = selectedProds.filter((prod, index) => key !== index);
      setSelectedProds(updatedProds);
    }
  };

  const handleDiscount = (discountAmount) => {
    const afterDiscount = totalDiscountPaidDue.total - discountAmount;
    let dueAmount = totalDiscountPaidDue.total - discountAmount;
    if (totalDiscountPaidDue.paid > 0) {
      dueAmount = dueAmount - totalDiscountPaidDue.paid;
    }
    setTotalDiscountPaidDue((prev) => ({
      ...prev,
      discount: discountAmount,
      due: dueAmount,
      afterDiscount,
    }));
  };

  const handlePaid = (paidAmount) => {
    const dueAmount = totalDiscountPaidDue.afterDiscount - paidAmount;
    setTotalDiscountPaidDue((prev) => ({
      ...prev,
      paid: paidAmount,
      due: dueAmount,
    }));
  };

  useEffect(() => {
    if (selectedProds.length > 0) {
      let total = 0;
      let afterDiscount = 0;
      let due = 0;

      selectedProds.forEach((prod) => {
        total += prod.price * prod.selectedQty;
      });

      if (totalDiscountPaidDue.discount > 0) {
        afterDiscount = total - totalDiscountPaidDue.discount;
      } else afterDiscount = total;

      if (totalDiscountPaidDue.paid > 0) {
        due = afterDiscount - totalDiscountPaidDue.paid;
      } else due = afterDiscount;

      setTotalDiscountPaidDue((prev) => ({
        ...prev,
        total,
        afterDiscount,
        due,
      }));
    }
  }, [selectedProds, totalDiscountPaidDue.paid, totalDiscountPaidDue.discount]);

  return (
    <Card className="mt-3">
      <Form
        form={form}
        className="m-lg-4"
        name="dynamic_form_nest_item"
        // onFinish={onFinish}
        onChange={onChange}
        onFinishFailed={() => {
          setLoader(false);
        }}
        layout="vertical"
        size="large"
        autoComplete="off"
      >
        <Row className="mr-top" gutter={[24, 24]}>
          <Col span={24} className="border rounded column-design">
            <Title level={4} className="m-2 text-center">
              New Income
            </Title>
          </Col>
          <Col span={24} lg={16}>
            <div className="d-flex justify-content-between mb-1">
              <Form.Item
                label="Customer "
                name="customer_id"
                style={{ maxWidth: "250px" }}
                rules={[
                  {
                    required: true,
                    message: "Please Select a Customer!",
                  },
                ]}
              >
                {param?.id === undefined ? (
                  <Select
                    loading={!allCustomer}
                    showSearch
                    placeholder="Select a customer "
                    optionFilterProp="children"
                    onChange={(id) => {
                      setCustomerId(id);
                    }}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {allCustomer &&
                      allCustomer?.map((sup) => (
                        <Option key={sup?.id} value={sup?.id}>
                          {sup?.first_name}{" "}
                          {sup?.last_name ? sup?.last_name : null}
                        </Option>
                      ))}
                  </Select>
                ) : (
                  <Title level={2}>
                    {customer?.first_name} {customer?.last_name}
                  </Title>
                )}
              </Form.Item>
              <Form.Item label="Date" required>
                <DatePicker
                  onChange={(value) => setDate(value._d)}
                  defaultValue={date}
                  style={{ marginBottom: "10px" }}
                  label="date"
                  name="date"
                  rules={[
                    {
                      required: true,
                      message: "Please input Date!",
                    },
                  ]}
                />
              </Form.Item>

              {/* Sales Person Input Field */}
              <Form.Item
                label="Sales Person "
                name="sales_person_id"
                style={{ maxWidth: "250px" }}
                rules={[
                  {
                    required: true,
                    message: "Please Select a sales person!",
                  },
                ]}
              >
                <Select
                  loading={!allStaff}
                  showSearch
                  placeholder="Select sales person "
                  optionFilterProp="children"
                  onChange={(id) => setSalesPerson(id)}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {allStaff &&
                    allStaff?.map((info) => (
                      <Option key={info.id} value={info.id}>
                        {info.username}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </div>

            <Serivce
              formData={formData}
              setData={setFormData}
              allProducts={customer?.services.filter(
                (item) => item.service_category.name === "Non-Billable"
              )}
              selectedProds={selectedProds}
              handleSelectedProds={handleSelectedProds}
              handleSelectedProdsQty={handleSelectedProdsQty}
              handleSelectedProdsSalePrice={handleSelectedProdsSalePrice}
              handleDeleteProd={handleDeleteProd}
            />
          </Col>

          <Col span={24} lg={8}>
            <div
              style={{
                padding: "10px 20px",
                display: "flex",
                justifyContent: "space-between",
                border: "1px solid #ccc",
              }}
            >
              <strong>Total: </strong>
              <strong>zmk {totalDiscountPaidDue.total}</strong>
            </div>

            <div
              style={{
                padding: "10px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <strong>Discount: </strong>
              <Form.Item
                name="discount"
                rules={[
                  {
                    required: true,
                    message: "Please input discount!",
                  },
                ]}
              >
                <InputNumber type="number" onChange={handleDiscount} />
              </Form.Item>
            </div>

            <div
              style={{
                padding: "10px 20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <strong>After Discount: </strong>
              <strong>zmk {totalDiscountPaidDue.afterDiscount}</strong>
            </div>

            <div
              style={{
                padding: "10px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <strong>Paid Amount: </strong>
              <Form.Item
                name="paid_amount"
                rules={[
                  {
                    required: true,
                    message: "Please input Paid amount!",
                  },
                ]}
              >
                <InputNumber type="number" onChange={handlePaid} />
              </Form.Item>
            </div>
            <div
              style={{
                padding: "10px 20px",
                display: "flex",
                justifyContent: "space-between",
                border: "1px solid #ccc",
              }}
            >
              <strong>Due Amount: </strong>
              <strong>zmk {totalDiscountPaidDue.due}</strong>
            </div>

            <Form.Item style={{ marginTop: "15px" }}>
              <Button
                block
                type="primary"
                htmlType="submit"
                loading={loader}
                onClick={() => {
                  onClickLoading();
                  onFormSubmit();
                }}
              >
                Pay
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default AddSale;
