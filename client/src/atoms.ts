import { atom } from "recoil";
import { User } from "./interfaces/User"


export const userState = atom<User | null>({
  key: "user",
  default: null
});

export const userDataState = atom<User | null>({
  key: "userData",
  default: null
});