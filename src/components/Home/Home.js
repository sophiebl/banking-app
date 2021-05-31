import { useEffect } from "react";
import { getUser } from "../../helpers/auth";

import Layout from "../Layout";

export default function Home() {
  useEffect(() => {
    const user = getUser();
    console.log(user);
    if (!user) {
      window.location = "/login";
    }
  });
  return <Layout />;
}
