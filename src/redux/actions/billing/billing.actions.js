import {
  LOAD_ALL_BILLING,
  PENDING_NON_BILLABLE,
  UPDATE_BILLING,
} from "../../types/BillingType";
import axios from "axios";
import { toast } from "react-toastify";

const LoadAllbillingAction = (data) => {
  return {
    type: LOAD_ALL_BILLING,
    payload: data,
  };
};
const updateBillingAction = (id, data) => {
  return {
    type: UPDATE_BILLING,
    payload: { id: id, data: data },
  };
};
const LoadPendingNonBillableAction = (data) => {
  return {
    type: PENDING_NON_BILLABLE,
    payload: data,
  };
};

export const LoadAllbilling = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("billing/");
      console.log(data);
      dispatch(LoadAllbillingAction(data));
      return "success";
    } catch (error) {
      toast.error("Something went wrong in payment");
      console.log(error.message);
    }
  };
};

export const getPendingNonBillables = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("billing/pending");
      dispatch(LoadPendingNonBillableAction(data));
      console.log(data)
      return "success";
    } catch (error) {
      toast.error("failed to load pending billings");
      console.log(error.message);
    }
  };
};
export const updateBilling = (values, id) => {
  console.log({ values: values });
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`billing/update/${id}`, values);
      dispatch(updateBillingAction({ id: id, data: data }));
      console.log({ billing: data });
      return "success";
    } catch (error) {
      toast.error("error updating billing", error);
      console.log(error.message);
    }
  };
};
