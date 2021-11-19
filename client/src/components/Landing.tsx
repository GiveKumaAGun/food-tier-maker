import React from "react";
import { useHistory } from "react-router-dom";
import { userState } from "../atoms";
import { useRecoilValue } from "recoil";

export default function Landing() {
  const user = useRecoilValue(userState);
  const history = useHistory();

  React.useEffect(() => {
    if (user) {
      history.push("/dashboard");
    } else {
      history.push("/login");
    }
  }, []);

  return (
    <div>
      Landing
    </div>
  );
}
