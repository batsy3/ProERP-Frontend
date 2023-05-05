import axios from "axios";
import { toast } from "react-toastify";
import { ADD_INVOICE } from "../../types/ProductType";

const createInvoiceAction = (data) => {
  return {
    type: ADD_INVOICE,
    payload: data,
  };
};

export const createInvoice = (values) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/billing-receipt", values);
      dispatch(createInvoiceAction(data));
      toast.success("invoice created successfully");
      return data
    } catch (error) {
      toast.error(toast.error("error creating invoice"));
    }
  };
};
