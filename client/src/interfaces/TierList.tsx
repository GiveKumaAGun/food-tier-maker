import { GeoPoint } from "@firebase/firestore";

export interface TierItem {
  name: string,
  comment?: string,
  image?: string,
}

export interface TierRow {
  row_items: TierItem[],
  row_name: string
}

export interface TierListInfo {
  ranking_rows: TierRow[],
  rest_id?: string,
  user_id: string,
  rest_name: string,
  address?: string,
  comment?: string,
  place_id?: string,
  geopoint?: GeoPoint,
  id: string,
}