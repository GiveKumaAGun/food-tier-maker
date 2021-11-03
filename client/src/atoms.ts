import { atom } from "recoil";
import { User, TierList } from "./interfaces/User"
import { DocumentData } from "@firebase/firestore";


export const userState = atom<User | null>({
  key: "user",
  default: null
});

export const userDataState = atom<DocumentData | null>({
  key: "userData",
  default: null
});

export const userListsState = atom<TierList[]>({
  key: "userData",
  default: []
});