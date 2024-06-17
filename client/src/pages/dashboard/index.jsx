import React from "react";
import { useUser } from "@clerk/clerk-react";
import FinanceForm from "./FinanceForm";
import FinanceList from "./FinanceList";


export default function Dashboard() {
  const {user}=useUser();
  return (
    <div className="dashboard-container">
      <h1>Welcome {user?.firstName}!! Here Are Your Finances:</h1>
      <FinanceForm/>
      <FinanceList/>
    </div>
  );
}
