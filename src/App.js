import "./App.css";
import React, { useState, useEffect } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { fetchUserAttributes } from "aws-amplify/auth";
import { cognitoUserPoolsTokenProvider } from "aws-amplify/auth/cognito";
import { CookieStorage } from "aws-amplify/utils";
import { get, post } from "aws-amplify/api";

import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Todo from "./components/Todo";

function App() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    email: "",
    email_verified: "",
    phone_number: "",
    phone_number_verified: "",
    name: "",
    family_name: "",
    sub: "",
  });

  useEffect(() => {
    const cookies = new CookieStorage();
    cognitoUserPoolsTokenProvider.setKeyValueStorage(cookies);

    const fetchCreateLiveness = async () => {
      try {
        const userAttributes = await fetchUserAttributes();
        setProfile({
          ...userAttributes,
        });
      } catch (error) {
        navigate("/");
      }
    };

    fetchCreateLiveness();
  }, []);

  return (
    <Authenticator
      loginMechanisms={["email"]}
      signUpAttributes={["email", "family_name", "name", "phone_number"]}
    >
      {({ signOut, user }) => (
        <main>
          <Navbar
            signOut={signOut}
            name={profile.name}
            family_name={profile.family_name}
          />
          <Routes>
            <Route path="/" element={<Todo title={"Todo List"} />} />
            <Route
              path="/profile"
              element={
                <Profile
                  title={"Profile"}
                  name={profile.name}
                  surname={profile.family_name}
                  email={profile.email}
                  phoneNumber={profile.phone_number}
                />
              }
            />
          </Routes>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
