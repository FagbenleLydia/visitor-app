import { StateCreator } from "zustand";

import { StoreType } from "../index";

interface userDetailsProps {

  id: number,
  dateCreated: string,
  createdBy: string,
  dateUpdated: string,
  updatedBy: null | string,
  emailAddress: string,
  userName: string,
  firstName: string,
  lastName: string,
  userRole: string,
  userStatus: boolean,
  lastLongInDate: string

}

export interface visitorProps {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  whoToVisit: string;
  purpose: string;
  timeIn: string;
  timeOut: null | string;
  dateVisited: string;
};

interface ContextType {
  req: any;
  res: any;
}

export interface CreateAuthSliceType {
  openSidebar: boolean;
  setOpenSidebar: (arg: boolean) => void;
  userDetail: userDetailsProps;
  setUserDetail: (arg: userDetailsProps) => void;
  visitorDetail: visitorProps;
  setVisitorDetail: (arg: visitorProps) => void;

}

const createAuthSlice: StateCreator<StoreType, [], [], CreateAuthSliceType> = (
  set,
  get,
) => ({
  openSidebar: false,
  setOpenSidebar: (arg: boolean) => {
    set(() => ({ openSidebar: arg }));
  },
  userDetail: {} as userDetailsProps,
  setUserDetail: (arg: userDetailsProps) => {
    set(() => ({ userDetail: arg }));
  },
  visitorDetail: {} as visitorProps,
  setVisitorDetail: (arg: visitorProps) => {
    set(() => ({ visitorDetail: arg }));
  }
});

export default createAuthSlice;
