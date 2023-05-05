import { CUSTOMERS, GET_WALK_IN_CUSTOMER } from "../../types/CustomerType";
import axios from "axios";

const getCustomer = (data) => {
  return {
    type: CUSTOMERS,
    payload: data,
  };
};
const getWalkInCustomer = (data) => {
  return {
    type: GET_WALK_IN_CUSTOMER,
    payload: data,
  };
};

export const loadAllCustomer = () => {
  //dispatching with an call back function and returning that
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`customer`);
      //dispatching data
      dispatch(getCustomer(data));
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const loadWalkInCustomer = () => {
  //dispatching with an call back function and returning that
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`walkIn`);
      //dispatching data
      dispatch(getWalkInCustomer(data));
      localStorage.setItem("walk-In", data?.id)
    } catch (error) {
      console.log(error.message);
    }
  };
};
