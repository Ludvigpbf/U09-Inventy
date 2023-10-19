import { createAction } from "@reduxjs/toolkit";

export const login = createAction<string>("auth/login");
export const logout = createAction("auth/logout");
