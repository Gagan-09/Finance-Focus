import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

export const FinancialRecordsContext = createContext();

export const FinancialRecordsProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const { user } = useUser();
   

  const fetchRecords = async () => {
    if (!user) return;

    try {
      const response = await fetch(
        `http://localhost:3000/financial-records/getAllByUserID/${user.id}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const records = await response.json();
      console.log(records)
      setRecords(records);
    } catch (error) {
      console.error("Error fetching records:", error.message);
    }
  };
  useEffect(() => {
    fetchRecords();
  }, [user]); //whenever the user changes,requested again


  const addRecord = async (record) => {
    try {
      const response = await fetch("http://localhost:3000/financial-records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const newRecord = await response.json();
      setRecords((prev) => [...prev, newRecord]);
    } catch (error) {
      console.error("Error adding record:", error.message);
      throw error; // Re-throw error to be handled by the caller or component
    }
  };

  const updateRecord = async (id, newRecord) => {
    try {
      const response = await fetch(
        `http://localhost:3000/financial-records/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(newRecord),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const updatedRecord = await response.json();
        setRecords((prev) =>
          prev.map((record) => (record._id === id ? updatedRecord : record))
        );
      } else {
        console.error("Failed to update record:", response.statusText);
      }
    } catch (err) {
      console.error("Error updating record:", err);
    }
  };

  const deleteRecord = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/financial-records/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const deletedRecord = await response.json();
        setRecords((prev) =>
          prev.filter((record) => record._id !== deletedRecord._id)
        );
      } else {
        console.error("Failed to delete record:", response.statusText);
      }
    } catch (err) {
      console.error("Error deleting record:", err);
    }
  };

  return (
    <FinancialRecordsContext.Provider
      value={{ records, addRecord, updateRecord, deleteRecord }}
    >
      {children}
    </FinancialRecordsContext.Provider>
  );
};

export const useFinancialRecords = () => {
  const context = useContext(FinancialRecordsContext);

  if (!context) {
    throw new Error(
      "useFinancialRecords must be used within a FinancialRecordsProvider"
    );
  }

  return context;
};
