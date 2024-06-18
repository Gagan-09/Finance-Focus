import React, { useMemo } from "react";
import { useUser } from "@clerk/clerk-react";
import FinanceForm from "./FinanceForm";
import FinancialRecordList from "./FinanceList";
import { useFinancialRecords } from "../../contexts/FinancialRecordsContext";
import "./FinancialRecord.css";

const Dashboard = () => {
  const { user } = useUser();
  const { records } = useFinancialRecords();

  const totalMonthly = useMemo(() => {
    let totalAmount = 0;
    records.forEach((record) => {
      totalAmount += record.amount;
    });

    return totalAmount;
  }, [records]);

  return (
    <div className="dashboard-container">
      <h1> Welcome {user?.firstName}! Here Are Your Finances:</h1>
      <FinanceForm />
      <div>Total Monthly: ₹{totalMonthly}</div>
      <FinancialRecordList />
    </div>
  );
};

export default Dashboard;
