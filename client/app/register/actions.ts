// Create an actions.js file
export interface UserData {
  company: string;
  email: string;
  password: string;
  plan: string;
  billing: {
    company: string;
    orgNumber: string;
    address: string;
    email: string;
    phone: string;
  };
  departments: {
    department: string;
    manager: string;
  }[];
}
export interface SetUserDataAction {
  type: "SET_USER_DATA";
  payload: UserData;
}

export interface SetBillingDataAction {
  type: "SET_BILLING_DATA";
  payload: UserData["billing"];
}

export interface SetPlanDataAction {
  type: "SET_PLAN_DATA";
  payload: string;
}

export const setUserData = (userData: UserData): SetUserDataAction => ({
  type: "SET_USER_DATA",
  payload: userData,
});

export const setBillingData = (
  billingData: UserData["billing"]
): SetBillingDataAction => ({
  type: "SET_BILLING_DATA",
  payload: billingData,
});

export const setPlanData = (plan: string): SetPlanDataAction => ({
  type: "SET_PLAN_DATA",
  payload: plan,
});
