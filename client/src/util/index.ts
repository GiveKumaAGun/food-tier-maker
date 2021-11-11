import { collection, query, where, getDocs, doc, updateDoc} from "firebase/firestore";
import { db } from '../firebaseConfig'

export const getUserLists = async (uid: string) => {
  const q = query(collection(db, "tier_lists"), where("user_id", "==", uid));
  const querySnapshot = await getDocs(q);
  const lists = querySnapshot.docs.map((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const data = doc.data()
    return {
      address: data.address,
      comment: data.comment,
      ranking_rows: data.ranking_rows,
      rest_name: data.rest_name,
      rest_id: data.rest_id,
      user_id: data.user_id,
      geopoint: data.geopoint,
      id: data.id
    }
  });
  return lists
}
