import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";

import "./App.css";

interface UserData {
  id: number;
  language_code: string;
  is_premium?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
}

function App() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user as UserData);
    }
  }, []);

  return (
    <main>
      <div>
        {userData ? (
          <ul>
            <li>ID: {userData.id}</li>
            <li>first_name: {userData.first_name}</li>
            <li>last_name: {userData.last_name}</li>
            <li>language_code: {userData.language_code}</li>
            <li>username: {userData.username}</li>
            <li>is_premium: {userData.is_premium ? "YES" : "NO"}</li>
          </ul>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </main>
  );
}

export default App;
