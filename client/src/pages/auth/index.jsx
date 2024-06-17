import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

export default function Auth() {
  return (
    <div>
      {/* <h1>SignIn</h1> */}
      {/* If signed out show these buttons */}
      <SignedOut>
        <SignUpButton mode="modal"/> {/*mode="modal" --  To open in same tab or as a modal*/ }
        <SignInButton mode="modal"/>
      </SignedOut>

      {/* if signed in show these buttons */}
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
