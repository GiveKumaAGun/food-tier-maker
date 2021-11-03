export interface User {
  uid: string,
  displayName: string | null,
  email: string | null,
}

export interface TierList {
  id: string,
  ranking_rows: unknown,
  rest_id: string,
  user_id: string,
  rest_name: string
}