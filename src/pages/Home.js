import React, { useState } from "react";

import Main from "../components/Layout/Main";
import { getUser } from "../helpers/auth";

export default function Home() {
  const [userData] = useState(getUser());

  if (!userData) {
    window.location = "/login";
  }

  return <Main userData={userData} home />;
}
