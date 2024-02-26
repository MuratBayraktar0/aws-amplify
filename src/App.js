import "./App.css";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";


function App() {
  return (
    <div className="App">
      <Authenticator
        loginMechanisms={["email"]}
        signUpAttributes={["email", "family_name", "name", "phone_number"]}
      >
        {({ signOut, user }) => (
          <main>
            <h1>Welcome {user.userId}</h1>
            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </Authenticator>{" "}
    </div>
  );
}

export default App;
