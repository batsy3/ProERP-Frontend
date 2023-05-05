import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
  Tabs,
  Space,
  Tag,
} from "antd";

import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllDesignation } from "../../redux/actions/designation/getDesignationAction";
import { addStaff } from "../../redux/actions/user/addStaffAciton";
import { addEmployee, getRoles } from "../role/roleApis";
import { Collapse } from "antd";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const AddUser = () => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const { Title } = Typography;
  const { Option } = Select;

  //objects useStates
  const [list, setList] = useState(null);
  const [Index, setIndex] = useState(0);
  const [employeeDetails, setEmployeeDetails] = useState({
    employee_number: "",
    ss_number: "",
    driver_license_number: "",
    license_expiry_date: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    other_name: "",
    gender: "",
    date_of_birth: "",
    nationality: "",
    marital_status: "",
    is_smoker: false,
    blood_group: "",
    department_id: null,
  });
  const [dependant, setDependant] = useState({
    name: "",
    relationship: "",
    dob: "",
  });
  const [emergencyContact, setEmergencyContact] = useState({
    name: "",
    relationship: "",
    mobile_phone: "",
    work_phone: "",
    home_phone: "",
  });
  const [employeeContact, setEmployeeContact] = useState({
    email: "",
    work_email: "",
    home_phone: "",
    mobile_phone: "",
    work_phone: "",
    street_1: "",
    street_2: "",
    city: "",
    province: "",
    postal_code: "",
    country: "",
  });
  const [job, setJob] = useState({
    job_title: "",
    job_category: "",
    location: "",
    joined_date: "",
  });
  const [salary, setSalary] = useState({
    pay_grade: "",
    pay_frequency: "",
    currency: "",
    gross_pay: 0,
    daily_rate: 0,
    salary_division_id: 0,
  });
  const [education, setEducation] = useState({
    education_level: "",
    institute: "",
    major: "",
    year: 0,
    start_date: "",
    end_date: "",
  });
  const [experience, setExperience] = useState({
    company: "",
    job_title: "",
    start_date: "",
    end_date: "",
  });
  const [skill, setSkill] = useState({
    skill: "",
    years_of_experience: null,
  });
  const [License, setLicense] = useState({
    license_type: "",
    license_number: "",
    issue_date: "",
    expiry_date: "",
  });
  const [Membership, setMembership] = useState({
    membership: "",
    subscription_paid_by: "",
    subscription_amount: null,
    subscription_start_date: "",
    subscription_renewal_date: "",
  });

  // Arrays States
  const [depArray, setArray] = useState([]);
  const [contactArray, setContactArray] = useState([]);
  const [EducationArray, setEducationArray] = useState([]);
  const [ExperienceArray, setExperienceArray] = useState([]);
  const [SkillArray, setSkillArray] = useState([]);
  const [LicenseArray, setLicenseArray] = useState([]);
  const [MembershipArray, setMembershipArray] = useState([]);

  // redux queries
  const designation = useSelector((state) => state.designations?.list);

  useEffect(() => {
    // setArray([])
    getRoles()
      .then((d) => setList(d))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    dispatch(loadAllDesignation());
  }, []);

  const [form] = Form.useForm();
  const [employeeForm] = Form.useForm();
  const [employeeDependantForm] = Form.useForm();
  const [emergencyContactForm] = Form.useForm();
  const [employeeContactForm] = Form.useForm();
  const [employeeJobForm] = Form.useForm();
  const [employeeSalaryForm] = Form.useForm();
  const [employeeEducationForm] = Form.useForm();
  const [employeeExperienceForm] = Form.useForm();
  const [employeeSkillForm] = Form.useForm();
  const [employeeLicenseForm] = Form.useForm();
  const [employeeMembershipForm] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const resp = await dispatch(addStaff(values));
      setLoader(true);
      if (resp === "success") {
        setLoader(false);
      } else {
        setLoader(false);
      }

      form.resetFields();
    } catch (error) {
      console.log(error.message);
      setLoader(false);
    }
  };
  const employeeFinish = (value) => {
    try {
      let formData = new FormData();
      formData.append("employee_number", value.employee_number);
      formData.append("ss_number", value.ss_number);
      formData.append("drivers_licence_number", value.drivers_licence_number);
      formData.append("license_expiry_date", value.license_expiry_date);
      formData.append("first_name", value.frist_name);
      formData.append("middle_name", value.middle_name);
      formData.append("last_name", value.last_name);
      formData.append("other_name", value.other_name);
      formData.append("gender", value.gender);
      formData.append("dob", value.dob);
      formData.append("nationality", value.nationality);
      formData.append("marital_status", value.marital_status);
      formData.append("is_Smoker", value.is_Smoker);
      formData.append("blood_group", value.blood_group);
      formData.append("department_Id", value.department_Id);

      setEmployeeDetails({
        blood_group: formData.get("blood_group"),
        date_of_birth: formData.get("dob"),
        employee_number: formData.get("employee_number"),
        ss_number: formData.get("ss_number"),
        driver_license_number: formData.get("drivers_licence_number"),
        license_expiry_date: formData.get("license_expiry_date"),
        first_name: formData.get("first_name"),
        middle_name: formData.get("middle_name"),
        last_name: formData.get("last_name"),
        other_name: formData.get("other_name"),
        gender: formData.get("gender"),
        nationality: formData.get("nationality"),
        marital_status: formData.get("marital_status"),
        is_smoker: formData.get("is_Smoker") === "No" ? false : true,
        blood_group: formData.get("blood_group"),
        department_id: formData.get("department_Id"),
      });
      console.log(employeeDetails);
      toast.success("saved !");
      employeeForm.resetFields();
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  const employeeDependantFinish = (value) => {
    try {
      let formData = new FormData();
      formData.append("name", value.name);
      formData.append("relationship", value.relationship);
      formData.append("date_of_birth", value.date_of_birth);

      for (var item in depArray) {
        if (
          item.name === formData.get("name") &&
          item.date_of_birth === formData.get("date_of_birth")
        ) {
          toast.error("dependant already exists");
        }
      }
      setArray([
        ...depArray,
        {
          name: formData.get("name"),
          relationship: formData.get("relationship"),
          date_of_birth: new Date(formData.get("date_of_birth")).toISOString(),
        },
      ]);
      console.log(depArray);
      employeeDependantForm.resetFields();
    } catch (error) {
      toast.error("failed to create dependant");
    }
  };
  const emergencyContactFinish = (value) => {
    try {
      let formData = new FormData();
      formData.append("name", value.name);
      formData.append("relationship", value.relationship);
      formData.append("home_phone", value.home_phone);
      formData.append("work_phone", value.work_phone);
      formData.append("mobile_phone", value.mobile_phone);

      for (var item in contactArray) {
        if (
          item.name === formData.get("name") &&
          item.relationship === formData.get("relationship")
        ) {
          toast.error("contact already exists");
        }
      }
      setContactArray([
        ...contactArray,
        {
          name: formData.get("name"),
          home_phone: formData.get("home_phone"),
          mobile_phone: formData.get("mobile_phone"),
          relationship: formData.get("relationship"),
          work_phone: formData.get("work_phone"),
        },
      ]);
      emergencyContactForm.resetFields();
    } catch (error) {
      toast.error("error creating emergency contact");
    }
  };
  const educationFinish = (value) => {
    try {
      let formData = new FormData();
      formData.append("education_level", value.education_level);
      formData.append("institute", value.institute);
      formData.append("major", value.major);
      formData.append("year", value.year);
      formData.append("start_date", value.start_date);
      formData.append("end_date", value.end_date);

      for (var item in EducationArray) {
        if (
          item.institute === formData.get("institute") &&
          item.start_date === formData.get("start_date") &&
          item.end_date === formData.get("end_date") &&
          item.major === formData.get("major")
        ) {
          toast.error("institute already exists");
        }
      }

      setEducationArray([
        ...EducationArray,
        {
          year: parseInt(formData.get("year")),
          education_level: formData.get("education_level"),
          end_date: new Date(formData.get("end_date")).toISOString(),
          institute: formData.get("institute"),
          major: formData.get("major"),
          start_date: new Date(formData.get("start_date")).toISOString(),
        },
      ]);
      employeeEducationForm.resetFields();
    } catch (error) {
      toast.error("error creating education");
    }
  };
  const experienceFinish = (value) => {
    try {
      let formData = new FormData();
      formData.append("company", value.company);
      formData.append("job_title", value.job_title);
      formData.append("start_date", value.start_date);
      formData.append("end_date", value.end_date);

      for (var item in ExperienceArray) {
        if (
          item.company === formData.get("company") &&
          item.start_date === formData.get("start_date")
        ) {
          toast.error("already exists");
        }
      }
      setExperienceArray([
        ...ExperienceArray,
        {
          end_date: new Date(formData.get("end_date")).toISOString(),
          start_date: new Date(formData.get("start_date")).toISOString(),
          job_title: formData.get("job_title"),
          company: formData.get("company"),
        },
      ]);
      employeeExperienceForm.resetFields();
    } catch (error) {
      toast.error("error creating job");
    }
  };
  const skillFinish = (value) => {
    try {
      let formData = new FormData();
      formData.append("skill", value.skill);
      formData.append("years_of_experience", value.years_of_experience);

      for (var item in SkillArray) {
        if (item.skill === formData.get("skill")) {
          toast.error("already exists");
        }
      }

      setSkillArray([
        ...SkillArray,
        {
          skill: formData.get("skill"),
          years_of_experience: parseInt(formData.get("years_of_experience")),
        },
      ]);
      employeeSkillForm.resetFields();
    } catch (error) {
      toast.error("error creating skill");
    }
  };

  const LicenseFinish = (value) => {
    try {
      let formData = new FormData();
      formData.append("license_type", value.license_type);
      formData.append("license_number", value.license_number);
      formData.append("issue_date", value.issue_date);
      formData.append("expiry_date", value.expiry_date);

      for (var item in LicenseArray) {
        if (
          item.license_number === formData.get("license_number") &&
          item.issue_date === formData.get("issue_date")
        ) {
          toast.error("already exists");
        }
      }
      setLicenseArray([
        ...LicenseArray,
        {
          expiry_date: new Date(formData.get("expiry_date")).toISOString(),
          issue_date: new Date(formData.get("issue_date")).toISOString(),
          license_number: formData.get("license_number"),
          license_type: formData.get("license_type"),
        },
      ]);
      employeeLicenseForm.resetFields();
    } catch (error) {
      toast.error("error creating employee license");
    }
  };
  const MembershipFinish = (values) => {
    try {
      let formData = new FormData();
      formData.append("membership", values.membership);
      formData.append("subscription_paid_by", values.subscription_paid_by);
      formData.append("subscription_amount", values.subscription_amount);
      formData.append(
        "subscription_start_date",
        values.subscription_start_date
      );
      formData.append(
        "subscription_renewal_date",
        values.subscription_renewal_date
      );

      for (var item in MembershipArray) {
        if (item.membership === formData.get("membership")) {
          toast.error("already exists");
        }
      }
      setMembershipArray([
        ...MembershipArray,
        {
          membership: formData.get("membership"),
          subscription_amount: parseInt(formData.get("subscription_amount")),
          subscription_paid_by: formData.get("subscription_paid_by"),
          subscription_renewal_date: new Date(formData.get("subscription_renewal_date")).toISOString(),
          subscription_start_date: new Date(formData.get("subscription_start_date")).toISOString(),
        },
      ]);
      employeeMembershipForm.resetFields();
    } catch (error) {
      toast.error("failed to add")
    }
  };
  // dates
  const { TabPane } = Tabs;
  const { Panel } = Collapse;
  const onFinishFailed = (errorInfo) => {
    setLoader(false);
    toast.error("error creating Employee", errorInfo);
    console.log("Failed:", errorInfo);
  };
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <Fragment>
      <Card
        bordered={false}
        bodyStyle={{
          width: "100%",
        }}
      >
        <Tabs>
          {/* <TabPane tab="Add Staff" key="1">
            <>
              <Title level={4} className="m-2 text-center">
                Add New Staff
              </Title>
              <Form
                form={form}
                name="basic"
                labelCol={{
                  span: 6,
                }}
                wrapperCol={{
                  span: 18,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="User Name"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input username!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password !",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input email!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Joining Date"
                  name="join_date"
                  rules={[
                    {
                      required: true,
                      message: "Please input joining date!",
                    },
                  ]}
                >
                  <DatePicker className="date-picker" />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Leave Date"
                  name="leave_date"
                  rules={[
                    {
                      required: true,
                      message: "Please input leave date!",
                    },
                  ]}
                >
                  <DatePicker className="date-picker" />
                </Form.Item>

                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Pleases Select Type!",
                    },
                  ]}
                  label="Role"
                  name={"role"}
                  style={{ marginBottom: "20px" }}
                >
                  <Select
                    loading={!list}
                    optionFilterProp="children"
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    mode="single"
                    allowClear
                    style={{
                      width: "100%",
                    }}
                    placeholder="Please select"
                  >
                    {list &&
                      list.map((role) => (
                        <Option key={role.name}>{role.name}</Option>
                      ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Id No"
                  name="id_no"
                  rules={[
                    {
                      required: true,
                      message: "Please input id no",
                    },
                  ]}
                >
                  <Input placeholder="OE-012" />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Phone"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input phone",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Address"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Please input address",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Salary"
                  name="salary"
                  rules={[
                    {
                      required: true,
                      message: "Please input salary",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Blood Group"
                  name="blood_group"
                  rules={[
                    {
                      required: true,
                      message: "Please input blood group",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Pleases Select Designation!",
                    },
                  ]}
                  label="Designation"
                  name={"designation_id"}
                  style={{ marginBottom: "20px" }}
                >
                  <Select
                    loading={!designation}
                    optionFilterProp="children"
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    mode="single"
                    allowClear
                    style={{
                      width: "100%",
                    }}
                    placeholder="Please select"
                  >
                    {designation &&
                      designation.map((desg) => (
                        <Option key={desg.id}>{desg.name}</Option>
                      ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  wrapperCol={{
                    offset: 4,
                    span: 16,
                  }}
                >
                  <Button
                    onClick={() => setLoader(true)}
                    block
                    type="primary"
                    htmlType="submit"
                    shape="round"
                    loading={loader}
                  >
                    Add New Staff
                  </Button>
                </Form.Item>
              </Form>
            </>
          </TabPane> */}
          <TabPane tab="Add Employee" key="2">
            <>
              <Title level={4} className="m-2 text-center">
                Add New Employee
              </Title>
              <Collapse defaultActiveKey={["1"]} onChange={onChange}>
                {/* employee Details */}
                <Panel
                  header="Employee Details"
                  key="1"
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Form
                    form={employeeForm}
                    name="basic"
                    labelCol={{
                      span: 6,
                    }}
                    wrapperCol={{
                      span: 18,
                    }}
                    // initialValues={{
                    //   remember: true,
                    // }}
                    onFinish={employeeFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="on"
                  >
                    <Form.Item
                      style={{ marginBottom: "10px" }}
                      label="First Name"
                      name="frist_name"
                      rules={[
                        {
                          required: true,
                          message: "Please input First Name!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      style={{ marginBottom: "10px" }}
                      label="Middle Name"
                      name="middle_name"
                      rules={[
                        {
                          required: false,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      style={{ marginBottom: "10px" }}
                      label="Last Name"
                      name="last_name"
                      rules={[
                        {
                          required: true,
                          message: "please enter last name",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      style={{ marginBottom: "10px" }}
                      label="Social Security Number"
                      name="ss_number"
                      rules={[
                        {
                          required: true,
                          message: "Please input Social Security Number!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      style={{ marginBottom: "10px" }}
                      label="gender"
                      name="gender"
                      rules={[
                        {
                          required: true,
                          message: "Please input gender!",
                        },
                      ]}
                    >
                      <Select
                        defaultValue=""
                        style={{ width: 120 }}
                        options={[
                          { value: "Male", label: "Male" },
                          { value: "Female", label: "Female" },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item
                      style={{ marginBottom: "10px" }}
                      label="employee Number"
                      name="employee_number"
                      rules={[
                        {
                          required: true,
                          message: "Please input employee number",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      style={{ marginBottom: "10px" }}
                      label="department Id"
                      name="department_Id"
                      rules={[
                        {
                          required: true,
                          message: "Please input department id",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      style={{ marginBottom: "10px" }}
                      label="Divers License"
                      name="drivers_licence_number"
                      rules={[
                        {
                          required: true,
                          message: "Please input id Number",
                        },
                      ]}
                    >
                      <Input placeholder="drivers license" />
                    </Form.Item>
                    <Form.Item
                      style={{ marginBottom: "10px" }}
                      label="ID expiration"
                      name="license_expiry_date"
                      rules={[
                        {
                          required: true,
                          message: "Please input id expiration Date",
                        },
                      ]}
                    >
                      <DatePicker
                        required
                        placeholder="expiry date"
                        name="expiry date"
                        style={{
                          marginBottom: 9,
                        }}
                        format="DD/MM/YYYY"
                      />
                    </Form.Item>
                    <Form.Item
                      style={{ marginBottom: "10px" }}
                      label="Date of Birth"
                      name="dob"
                      rules={[
                        {
                          required: true,
                          message: "Please input Date of Birth",
                        },
                      ]}
                    >
                      <DatePicker
                        required
                        placeholder="date of birth"
                        name="d0b"
                        style={{
                          marginBottom: 9,
                        }}
                        format="DD/MM/YYYY"
                      />
                    </Form.Item>
                    <Form.Item
                      style={{ marginBottom: "10px" }}
                      label="Nationality"
                      name="nationality"
                      rules={[
                        {
                          required: true,
                          message: "Please input Nationality",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      style={{ marginBottom: "10px" }}
                      label="marital status"
                      name="marital_status"
                      rules={[
                        {
                          required: true,
                          message: "Please input marital status",
                        },
                      ]}
                    >
                      <Select
                        defaultValue=""
                        style={{ width: 120 }}
                        options={[
                          { value: "Married", label: "Married" },
                          { value: "Single", label: "Single" },
                          { value: "Widowed", label: "Widowed" },
                          { value: "Divorced", label: "Divorced" },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Pleases Select option!",
                        },
                      ]}
                      label="Are you a smoker ? "
                      name="is_Smoker"
                      style={{ marginBottom: "20px" }}
                    >
                      <Select
                        optionFilterProp="children"
                        showSearch
                        options={[
                          { value: "yes", label: "yes" },
                          { value: "No", label: "No" },
                        ]}
                        mode="single"
                        allowClear
                        style={{
                          width: "100%",
                        }}
                        placeholder="Please select"
                      />
                    </Form.Item>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Pleases Select blood Group!",
                        },
                      ]}
                      label="Blood Group "
                      name="blood_group"
                      style={{ marginBottom: "20px" }}
                    >
                      <Select
                        showSearch
                        options={[
                          { value: "O", label: "O" },
                          { value: "A", label: "A" },
                          { value: "B", label: "B" },
                          { value: "AB", label: "AB" },
                        ]}
                        mode="single"
                        allowClear
                        style={{
                          width: "100%",
                        }}
                        placeholder="Please select"
                        onChange={(e) => {
                          setEmployeeDetails({
                            ...employeeDetails,
                            blood_group: e,
                          });
                        }}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        save
                      </Button>
                    </Form.Item>{" "}
                  </Form>
                </Panel>
                {/* employee dependant */}
                <Panel
                  header="Employee Dependant"
                  key="2"
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Form
                    form={employeeDependantForm}
                    name="basic"
                    labelCol={{
                      span: 6,
                    }}
                    wrapperCol={{
                      span: 18,
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={employeeDependantFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    style={{
                      alignItem: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Form.Item
                      name="name"
                      label="name"
                      rules={[
                        {
                          required: true,
                          message: "Please input name!",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="relationship"
                      label="relationship"
                      rules={[
                        {
                          required: true,
                          message: "Please input relationship !",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="date_of_birth"
                      label="date of birth"
                      rules={[
                        {
                          required: true,
                          message: "Please input date !",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <DatePicker
                        placeholder="date of birth"
                        style={{
                          marginBottom: 9,
                        }}
                        format="DD/MM/YYYY"
                      />
                    </Form.Item>
                    <Form.Item
                      style={{ marginBottom: "10px" }}
                      wrapperCol={{
                        offset: 4,
                        span: 16,
                      }}
                    >
                      <Button
                        // onClick={employeeDependantFinish}
                        block
                        type="primary"
                        htmlType="submit"
                        shape="round"
                      >
                        Save
                      </Button>
                    </Form.Item>
                  </Form>
                  {contactArray && (
                    <Space size={[0, 8]} wrap>
                      {depArray.map((tag, index) => (
                        <Tag closable key={index}>
                          {tag.name}
                        </Tag>
                      ))}
                    </Space>
                  )}
                </Panel>
                {/* employee contact */}
                <Panel
                  header="Employee Contact"
                  key="3"
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Form
                    form={employeeContactForm}
                    name="basic"
                    labelCol={{
                      span: 6,
                    }}
                    wrapperCol={{
                      span: 18,
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    autoComplete="off"
                    style={{
                      alignItem: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Form.Item
                      name="email"
                      label="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input email!",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input
                        label="email"
                        rules={[
                          {
                            required: true,
                            message: "Please input email!",
                          },
                        ]}
                        required
                        placeholder="name"
                        style={{
                          marginBottom: 9,
                        }}
                        onChange={(e) =>
                          setEmployeeContact({
                            ...employeeContact,
                            email: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      name="work_email"
                      label="work email"
                      rules={[
                        {
                          required: true,
                          message: "Please input email !",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input
                        required
                        placeholder="work email"
                        style={{
                          marginBottom: 9,
                        }}
                        onChange={(e) =>
                          setEmployeeContact({
                            ...emergencyContact,
                            work_email: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      name="employee_home_Phone"
                      label="Home number"
                      rules={[
                        {
                          required: true,
                          message: "Please input phone number !",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input
                        placeholder="Home Phone Number"
                        style={{
                          marginBottom: 9,
                        }}
                        onChange={(e) =>
                          setEmployeeContact({
                            ...employeeContact,
                            home_phone: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      name="contact_work"
                      label="Work number"
                      rules={[
                        {
                          required: false,
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input
                        placeholder="Work Phone Number"
                        style={{
                          marginBottom: 9,
                        }}
                        onChange={(e) =>
                          setEmployeeContact({
                            ...employeeContact,
                            work_phone: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      name="contact_mobile"
                      label="Mobile number"
                      rules={[
                        {
                          required: false,
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input
                        placeholder="Mobile Phone Number"
                        style={{
                          marginBottom: 9,
                        }}
                        onChange={(e) =>
                          setEmployeeContact({
                            ...employeeContact,
                            mobile_phone: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      name="employee_street_1"
                      label="Street Address 1"
                      rules={[
                        {
                          required: true,
                          message: "please enter Street Address",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input
                        placeholder="Street Address"
                        style={{
                          marginBottom: 9,
                        }}
                        onChange={(e) =>
                          setEmployeeContact({
                            ...employeeContact,
                            street_1: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      name="employee_street_2"
                      label="Street Address 2"
                      rules={[
                        {
                          required: false,
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input
                        placeholder="Street Address 2"
                        style={{
                          marginBottom: 9,
                        }}
                        onChange={(e) =>
                          setEmployeeContact({
                            ...employeeContact,
                            street_2: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      name="employee_city"
                      label="City"
                      rules={[
                        {
                          required: true,
                          message: "please enter City",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input
                        placeholder="City"
                        style={{
                          marginBottom: 9,
                        }}
                        onChange={(e) =>
                          setEmployeeContact({
                            ...employeeContact,
                            city: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      name="employee_province"
                      label="provincey"
                      rules={[
                        {
                          required: true,
                          message: "please enter province",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input
                        placeholder="province"
                        style={{
                          marginBottom: 9,
                        }}
                        onChange={(e) =>
                          setEmployeeContact({
                            ...employeeContact,
                            province: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      name="employee_postal_code"
                      label="postal code"
                      rules={[
                        {
                          required: true,
                          message: "please enter postal code",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input
                        placeholder="postal code"
                        style={{
                          marginBottom: 9,
                        }}
                        onChange={(e) =>
                          setEmployeeContact({
                            ...employeeContact,
                            postal_code: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      name="employee_country"
                      label="country"
                      rules={[
                        {
                          required: true,
                          message: "please enter country",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input
                        placeholder="country"
                        style={{
                          marginBottom: 9,
                        }}
                        onChange={(e) =>
                          setEmployeeContact({
                            ...employeeContact,
                            country: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                  </Form>
                </Panel>
                {/* emergency contact */}
                <Panel
                  header="Emergency Contact"
                  key="4"
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Form
                    form={emergencyContactForm}
                    name="basic"
                    labelCol={{
                      span: 6,
                    }}
                    wrapperCol={{
                      span: 18,
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={emergencyContactFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    style={{
                      alignItem: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Form.Item
                      name="name"
                      label="name"
                      rules={[
                        {
                          required: true,
                          message: "Please input name!",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="relationship"
                      label="relationship"
                      rules={[
                        {
                          required: true,
                          message: "Please input relationship !",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="home_phone"
                      label="Home number"
                      rules={[
                        {
                          required: true,
                          message: "Please input phone number !",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="work_phone"
                      label="Work number"
                      rules={[
                        {
                          required: false,
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="mobile_phone"
                      label="Mobile number"
                      rules={[
                        {
                          required: false,
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      style={{ marginBottom: "10px" }}
                      wrapperCol={{
                        offset: 4,
                        span: 16,
                      }}
                    >
                      <Button
                        block
                        type="primary"
                        htmlType="submit"
                        shape="round"
                      >
                        Save
                      </Button>
                    </Form.Item>
                  </Form>
                  {contactArray && (
                    <Space size={[0, 8]} wrap>
                      {contactArray.map((tag, index) => (
                        <Tag closable key={index}>
                          {tag.name}
                        </Tag>
                      ))}
                    </Space>
                  )}
                </Panel>
                {/* employee job */}
                <Panel
                  header="Emergency Job"
                  key="5"
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Form
                    form={employeeJobForm}
                    name="basic"
                    labelCol={{
                      span: 6,
                    }}
                    wrapperCol={{
                      span: 18,
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    autoComplete="off"
                    style={{
                      alignItem: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Form.Item
                      name="job_title"
                      label="Job Title"
                      rules={[
                        {
                          required: true,
                          message: "Please input job title!",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input
                        placeholder="job title"
                        style={{
                          marginBottom: 9,
                        }}
                        onChange={(e) =>
                          setJob({
                            ...job,
                            job_title: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      name="job_category"
                      label="Job category"
                      rules={[
                        {
                          required: true,
                          message: "Please input job category!",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input
                        placeholder="job category"
                        style={{
                          marginBottom: 9,
                        }}
                        onChange={(e) =>
                          setJob({
                            ...job,
                            job_category: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      name="location"
                      label="location"
                      rules={[
                        {
                          required: true,
                          message: "Please input location!",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input
                        placeholder="location"
                        style={{
                          marginBottom: 9,
                        }}
                        onChange={(e) =>
                          setJob({
                            ...job,
                            location: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      name="joined_date"
                      label="joined date"
                      rules={[
                        {
                          required: true,
                          message: "Please input joined date!",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <DatePicker
                        required
                        placeholder="joined date"
                        name="start_date"
                        style={{
                          marginBottom: 9,
                        }}
                        onChange={(e) => {
                          setJob({
                            ...job,
                            joined_date: new Date(e).toISOString(),
                          });
                          console.log(e.toDate());
                        }}
                      />
                    </Form.Item>
                  </Form>
                </Panel>
                {/* employee salary */}
                <Panel
                  header="Employee Salary"
                  key="6"
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Form
                    form={employeeSalaryForm}
                    name="basic"
                    labelCol={{
                      span: 6,
                    }}
                    wrapperCol={{
                      span: 18,
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    autoComplete="off"
                    style={{
                      alignItem: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Form.Item
                      name="pay_grade"
                      label="Pay grade"
                      rules={[
                        {
                          required: true,
                          message: "Please input pay grade!",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input
                        placeholder="pay grade"
                        style={{
                          marginBottom: 9,
                        }}
                        onChange={(e) =>
                          setSalary({
                            ...salary,
                            pay_grade: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      name="pay_frequency"
                      label="pay frequency"
                      rules={[
                        {
                          required: true,
                          message: "Please input pay frequency!",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input
                        placeholder="pay frequency"
                        style={{
                          marginBottom: 9,
                        }}
                        onChange={(e) =>
                          setSalary({
                            ...salary,
                            pay_frequency: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      name="currency"
                      label="currency"
                      rules={[
                        {
                          required: true,
                          message: "Please input currency!",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input
                        placeholder="currency"
                        style={{
                          marginBottom: 9,
                        }}
                        onChange={(e) =>
                          setSalary({
                            ...salary,
                            currency: e.target.value,
                          })
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      name="gross_pay"
                      label="gross Pay"
                      rules={[
                        {
                          required: true,
                          message: "Please input gross Pay!",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input
                        placeholder="gross Pay"
                        style={{
                          marginBottom: 9,
                        }}
                        onChange={(e) =>
                          setSalary({
                            ...salary,
                            gross_pay: parseInt(e.target.value),
                          })
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      name="daily_rate"
                      label="daily rate"
                      rules={[
                        {
                          required: true,
                          message: "Please input daily rate!",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input
                        placeholder="daily rate"
                        style={{
                          marginBottom: 9,
                        }}
                        onChange={(e) =>
                          setSalary({
                            ...salary,
                            daily_rate: parseInt(e.target.value),
                          })
                        }
                      />
                    </Form.Item>
                    <Form.Item
                      name="salary_division_id"
                      label="salary division id "
                      rules={[
                        {
                          required: true,
                          message: "Please input salary division id !",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input
                        placeholder="salary division id "
                        style={{
                          marginBottom: 9,
                        }}
                        onChange={(e) =>
                          setSalary({
                            ...salary,
                            salary_division_id: parseInt(e.target.value),
                          })
                        }
                      />
                    </Form.Item>
                  </Form>
                </Panel>
                {/* employee education */}
                <Panel
                  header="Employee Education"
                  key="7"
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Form
                    form={employeeEducationForm}
                    name="basic"
                    labelCol={{
                      span: 6,
                    }}
                    wrapperCol={{
                      span: 18,
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={educationFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    style={{
                      alignItem: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Form.Item
                      name="education_level"
                      label="Education Level"
                      rules={[
                        {
                          required: true,
                          message: "Please input Education Level!",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="institute"
                      label="Institute"
                      rules={[
                        {
                          required: true,
                          message: "Please input institute !",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="major"
                      label="major"
                      rules={[
                        {
                          required: true,
                          message: "Please input major !",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="year"
                      label="year"
                      rules={[
                        {
                          required: true,
                          message: "Please input year !",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input type="number" />
                    </Form.Item>

                    <Form.Item
                      name="start_date"
                      label="start date"
                      rules={[
                        {
                          required: true,
                          message: "Please input date !",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <DatePicker
                        required
                        placeholder="start date"
                        name="start_date"
                        style={{
                          marginBottom: 9,
                        }}
                        format="DD/MM/YYYY"
                      />
                    </Form.Item>
                    <Form.Item
                      name="end_date"
                      label="End date"
                      rules={[
                        {
                          required: true,
                          message: "Please input date !",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <DatePicker
                        required
                        placeholder="End date"
                        name="End_date"
                        style={{
                          marginBottom: 9,
                        }}
                        format="DD/MM/YYYY"
                      />
                    </Form.Item>
                    <Form.Item
                      style={{ marginBottom: "10px" }}
                      wrapperCol={{
                        offset: 4,
                        span: 16,
                      }}
                    >
                      <Button
                        block
                        type="primary"
                        htmlType="submit"
                        shape="round"
                      >
                        Add
                      </Button>
                    </Form.Item>
                  </Form>
                  {EducationArray && (
                    <Space size={[0, 8]} wrap>
                      {EducationArray.map((tag, index) => (
                        <Tag closable key={index}>
                          {tag.institute}
                        </Tag>
                      ))}
                    </Space>
                  )}
                </Panel>
                {/* employee work experience */}
                <Panel
                  header="Employee Experience"
                  key="8"
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Form
                    form={employeeExperienceForm}
                    name="basic"
                    labelCol={{
                      span: 6,
                    }}
                    wrapperCol={{
                      span: 18,
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={experienceFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    style={{
                      alignItem: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Form.Item
                      name="company"
                      label="Company"
                      rules={[
                        {
                          required: true,
                          message: "Please input Company!",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="job_title"
                      label="job title"
                      rules={[
                        {
                          required: true,
                          message: "Please input job title !",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="start_date"
                      label="start date"
                      rules={[
                        {
                          required: true,
                          message: "Please input date !",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <DatePicker
                        required
                        placeholder="start date"
                        name="start_date"
                        style={{
                          marginBottom: 9,
                        }}
                        format="DD/MM/YYYY"
                      />
                    </Form.Item>
                    <Form.Item
                      name="end_date"
                      label="End date"
                      rules={[
                        {
                          required: true,
                          message: "Please input date !",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <DatePicker
                        required
                        placeholder="End date"
                        name="End_date"
                        style={{
                          marginBottom: 9,
                        }}
                        format="DD/MM/YYYY"
                      />
                    </Form.Item>
                    <Form.Item
                      style={{ marginBottom: "10px" }}
                      wrapperCol={{
                        offset: 4,
                        span: 16,
                      }}
                    >
                      <Button
                        block
                        type="primary"
                        htmlType="submit"
                        shape="round"
                      >
                        Add
                      </Button>
                    </Form.Item>
                  </Form>
                  {ExperienceArray && (
                    <Space size={[0, 8]} wrap>
                      {ExperienceArray.map((tag, index) => (
                        <Tag closable key={index}>
                          {tag.company}
                        </Tag>
                      ))}
                    </Space>
                  )}
                </Panel>
                {/* employee skill */}
                <Panel
                  header="Employee Skill"
                  key="9"
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Form
                    form={employeeSkillForm}
                    name="basic"
                    labelCol={{
                      span: 6,
                    }}
                    wrapperCol={{
                      span: 18,
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={skillFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    style={{
                      alignItem: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Form.Item
                      name="skill"
                      label="Skill"
                      rules={[
                        {
                          required: true,
                          message: "Please input Skill!",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="years_of_experience"
                      label="years of Experience"
                      rules={[
                        {
                          required: true,
                          message: "Please input years of Experience !",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      style={{ marginBottom: "10px" }}
                      wrapperCol={{
                        offset: 4,
                        span: 16,
                      }}
                    >
                      <Button
                        block
                        type="primary"
                        htmlType="submit"
                        shape="round"
                      >
                        Add
                      </Button>
                    </Form.Item>
                  </Form>
                  {SkillArray && (
                    <Space size={[0, 8]} wrap>
                      {SkillArray.map((tag, index) => (
                        <Tag closable key={index}>
                          {tag.skill}
                        </Tag>
                      ))}
                    </Space>
                  )}
                </Panel>
                {/* employee license */}
                <Panel
                  header="Employee Licenses"
                  key="10"
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Form
                    form={employeeLicenseForm}
                    name="basic"
                    labelCol={{
                      span: 6,
                    }}
                    wrapperCol={{
                      span: 18,
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={LicenseFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    style={{
                      alignItem: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Form.Item
                      name="license_type"
                      label="License Type"
                      rules={[
                        {
                          required: true,
                          message: "Please input License Type!",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="license_number"
                      label="License number"
                      rules={[
                        {
                          required: true,
                          message: "Please input License number !",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="issue_date"
                      label="issue date"
                      rules={[
                        {
                          required: true,
                          message: "Please input date !",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <DatePicker
                        required
                        style={{
                          marginBottom: 9,
                        }}
                        format="DD/MM/YYYY"
                      />
                    </Form.Item>
                    <Form.Item
                      name="expiry_date"
                      label="End date"
                      rules={[
                        {
                          required: true,
                          message: "Please input date !",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <DatePicker
                        required
                        placeholder="End date"
                        name="End_date"
                        style={{
                          marginBottom: 9,
                        }}
                        format="DD/MM/YYYY"
                      />
                    </Form.Item>

                    <Form.Item
                      style={{ marginBottom: "10px" }}
                      wrapperCol={{
                        offset: 4,
                        span: 16,
                      }}
                    >
                      <Button
                        block
                        type="primary"
                        htmlType="submit"
                        shape="round"
                      >
                        Add
                      </Button>
                    </Form.Item>
                  </Form>
                  {LicenseArray && (
                    <Space size={[0, 8]} wrap>
                      {LicenseArray.map((tag, index) => (
                        <Tag closable key={index}>
                          {tag.license_type}
                        </Tag>
                      ))}
                    </Space>
                  )}
                </Panel>
                {/* Employee Membership */}
                <Panel
                  header="Employee Membership"
                  key="11"
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Form
                    form={employeeMembershipForm}
                    name="basic"
                    labelCol={{
                      span: 6,
                    }}
                    wrapperCol={{
                      span: 18,
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={MembershipFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    style={{
                      alignItem: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Form.Item
                      name="membership"
                      label="Membership"
                      rules={[
                        {
                          required: true,
                          message: "Please input Membership !",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="subscription_paid_by"
                      label="subscription paid by"
                      rules={[
                        {
                          required: true,
                          message: "Please input field !",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="subscription_amount"
                      label="subscribed_amount"
                      rules={[
                        {
                          required: true,
                          message: "Please input subscribed_amount !",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="subscription_start_date"
                      label="subscription start date"
                      rules={[
                        {
                          required: true,
                          message: "Please input date !",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <DatePicker
                        required
                        name="subscription_start_date"
                        style={{
                          marginBottom: 9,
                        }}
                        format="DD/MM/YYYY"
                      />
                    </Form.Item>
                    <Form.Item
                      name="subscription_renewal_date"
                      label="End date"
                      rules={[
                        {
                          required: true,
                          message: "Please input date !",
                        },
                      ]}
                      style={{ margin: "10px" }}
                    >
                      <DatePicker
                        required
                        name="End_date"
                        style={{
                          marginBottom: 9,
                        }}
                        format="DD/MM/YYYY"
                      />
                    </Form.Item>
                    <Form.Item
                      style={{ marginBottom: "10px" }}
                      wrapperCol={{
                        offset: 4,
                        span: 16,
                      }}
                    >
                      <Button
                        block
                        type="primary"
                        htmlType="submit"
                        shape="round"
                      >
                        Add
                      </Button>
                    </Form.Item>
                  </Form>
                  {MembershipArray && (
                    <Space size={[0, 8]} wrap>
                      {MembershipArray.map((tag, index) => (
                        <Tag closable key={index}>
                          {tag.membership}
                        </Tag>
                      ))}
                    </Space>
                  )}
                </Panel>
              </Collapse>
              <Button
                onClick={async (e) => {
                  e.preventDefault();
                  {
                    let data = {
                      ss_number: employeeDetails.ss_number,
                      driver_license_number:
                        employeeDetails.driver_license_number,
                      license_expiry_date: employeeDetails.license_expiry_date,
                      first_name: employeeDetails.first_name,
                      middle_name: employeeDetails.middle_name,
                      last_name: employeeDetails.last_name,
                      other_name: employeeDetails.other_name,
                      gender: employeeDetails.gender,
                      date_of_birth: employeeDetails.date_of_birth,
                      nationality: employeeDetails.nationality,
                      marital_status: employeeDetails.marital_status,
                      is_smoker: employeeDetails.is_smoker,
                      blood_group: employeeDetails.blood_group,
                      employeeContact: {
                        email: employeeContact.email,
                        work_email: employeeContact.work_email,
                        home_phone: employeeContact.home_phone,
                        mobile_phone: employeeContact.mobile_phone,
                        work_phone: employeeContact.work_phone,
                        street_1: employeeContact.street_1,
                        street_2: employeeContact.street_2,
                        city: employeeContact.city,
                        province: employeeContact.province,
                        postal_code: employeeContact.postal_code,
                        country: employeeContact.country,
                      },
                      employeeJob: {
                        job_title: job.job_title,
                        job_category: job.job_category,
                        location: job.location,
                        joined_date: job.joined_date,
                        end_date: null,
                      },
                      employeeSalary: {
                        pay_grade: salary.pay_grade,
                        pay_frequency: salary.pay_frequency,
                        currency: salary.currency,
                        gross_pay: salary.gross_pay,
                        daily_rate: salary.daily_rate,
                        zra: true,
                        nhima: true,
                        napsa: true,
                        salary_division_id: salary.salary_division_id,
                        // employeeSalaryDepositDetail: {
                        //   account_number: 123456789,
                        //   account_type: "Savings",
                        //   bank_name: "Absa",
                        //   amount: 123456789,
                        // },
                      },
                      employeeDependant: depArray,
                      employeeEmergencyContact: contactArray,
                      employeeEducation: EducationArray,
                      employeeWorkExperience: ExperienceArray,
                      employeeSkill: SkillArray,
                      employeeLicense: LicenseArray,
                      employeeMembership: MembershipArray,
                    };
                    try {
                      console.log(data);
                      await addEmployee(data).then((success) =>
                        console.log(success)
                      );
                    } catch (error) {
                      toast.error("error creating employee");
                    }
                    console.log("sent");
                  }
                }}
                block
                type="primary"
                htmlType="submit"
                shape="round"
              >
                Create Employee
              </Button>
            </>
          </TabPane>
        </Tabs>
      </Card>
    </Fragment>
  );
};

export default AddUser;
