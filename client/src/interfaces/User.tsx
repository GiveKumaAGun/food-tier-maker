import { GeoPoint } from "@firebase/firestore";

export interface User {
  uid: string,
  displayName: string | null,
  email: string | null,
}

export interface TierList {
  ranking_rows: unknown,
  rest_id: string,
  user_id: string,
  rest_name: string,
  address?: string,
  comment?: string,
  place_id?: string
}