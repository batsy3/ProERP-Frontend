import {
  LOAD_ALL_BILLING,
  UPDATE_BILLING,
  PENDING_NON_BILLABLE,
} from "../types/BillingType";

const initialState = {
  list: null,
  pending: null,
};

const billingReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_BILLING:
      return { ...state, list: action.payload };
    case UPDATE_BILLING:
      const newList = state.list.map((item) =>
        item.id === action.payload.id ? action.payload.data : item
      );
      return { ...state, newList };
    case PENDING_NON_BILLABLE:
      return { ...state, pending: action.payload };
    default:
      return state;
  }
};

export default billingReducer;
