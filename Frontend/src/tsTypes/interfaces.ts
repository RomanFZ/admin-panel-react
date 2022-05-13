import { ChangeEvent } from "react";
import { UserState } from "../redux/reducers/userReducer";
import { RouterState } from "connected-react-router";
import { ReceptionState } from "../redux/reducers/receptionsReducer";

export type HandleChangeEvent = ChangeEvent<HTMLInputElement>;
export type HandleChangeEventSelect = ChangeEvent<HTMLSelectElement>;
export type HandleChangeEventTextArea = ChangeEvent<HTMLTextAreaElement>;

export interface Reception {
  name: string;
  doctor: string;
  date: string;
  complaint: string;
  id?: string;
  userId?: string;
  token?: string;
}

export interface SelectedReception {
  name?: string;
  doctor?: string;
  date?: string;
  complaint?: string;
  id?: string;
  userId?: any;
  token?: string;
}

export interface User {
  login: string;
  password: string;
  id?: string;
  userId?: string;
}

export interface AppState {
  receptions: ReceptionState;
  user: UserState;
  router: RouterState;
}
