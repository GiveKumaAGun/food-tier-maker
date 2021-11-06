import { atom } from "recoil";
import { User, TierListInfo } from "./interfaces/User"
import { DocumentData } from "@firebase/firestore";


export const userState = atom<User | null>({
  key: "user",
  default: null
});

export const userDataState = atom<DocumentData | null>({
  key: "userData",
  default: null
});

export const userListsState = atom<DocumentData[]>({
  key: "userData",
  default: []
});

export const currentListState = atom<DocumentData | null>({
  key: "currentList",
  default: null
})