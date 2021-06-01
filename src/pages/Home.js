import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Main from "../components/Layout/Main";

import { getUser, getTransactions } from "../helpers/auth";

export default function Home() {
  const [userData] = useState(getUser());

  if (!userData) {
    window.location = "/login";
  }

  const [userTransactions, setUserTransactions] = useState([]);

  useEffect(() => {
    async function getAllTransactions() {
      try {
        const trans = await getTransactions();
        setUserTransactions(trans);
      } catch (err) {}
    }
    getAllTransactions();
  }, []);

  return <Main userData={userData} home />;
}
