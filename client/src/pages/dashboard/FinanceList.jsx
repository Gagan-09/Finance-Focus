import React from "react";
import { useFinancialRecords } from "../../contexts/FinancialRecordsContext";

export default function FinanceList() {
  const {records} =useFinancialRecords();
  return (
    <div className="table-container">
      {/* <h3>Finance List</h3> */}
      <table>
        
      </table>
    </div>
  );
}
