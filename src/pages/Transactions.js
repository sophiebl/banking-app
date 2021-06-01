import React, { useState } from "react";

import { getUser } from "../helpers/auth";
import Main from "../components/Layout/Main";

export default function Transactions() {
  const [userData] = useState(getUser());
  if (!userData) {
    window.location = "/login";
  }

  return <Main userData={userData} transactions />;
}
