// reducers/registrationReducer.ts
import {
  SetBillingDataAction,
  SetUserDataAction,
  SetPlanDataAction,
} from "./actions";
import { UserData } from "./actions";

// registrationReducer.ts

const initialState = {
  user: null as UserData | null,
  billing: null as UserData["billing"] | null,
  plan: null as string | null,
};

export const registrationReducer = (
  state = initialState,
  action: SetUserDataAction | SetBillingDataAction | SetPlanDataAction // Include the new action type
) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return { ...state, user: action.payload };
    case "SET_BILLING_DATA": // Handle the new action
      return {
        ...state,
        user: {
          ...state.user!,
          billing: action.payload,
        },
      };
    case "SET_PLAN_DATA":
      return {
        ...state,
        user: {
          ...state.user!,
          plan: action.payload,
        },
      };
    default:
      return state;
  }
};

export default registrationReducer;
