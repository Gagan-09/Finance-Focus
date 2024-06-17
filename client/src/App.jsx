import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import SignIn from "./pages/auth";
import { FinancialRecordsProvider } from "./contexts/FinancialRecordsContext";
import {
  UserButton,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="navbar">
          <Link to="/"> Dashboard</Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Link to="/auth">Sign In</Link>
          </SignedOut>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <FinancialRecordsProvider>
                <Dashboard />
              </FinancialRecordsProvider>
            }
          />
          <Route path="/auth" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
