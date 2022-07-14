import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";

const UserContext = React.createContext();
const SetUserContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

export function useUpdateUser() {
  return useContext(SetUserContext);
}

export function UserProvider( { children }) {
  const [ cookies, setCookies ] = useCookies();
  const [ user, setUser ] = useState(cookies.user);

  function updateUser(user) {
    setUser(user);
    setCookies('user', user);
  }
  
  return (
    <UserContext.Provider value={user}>
      <SetUserContext.Provider value={updateUser}>
        { children }
      </SetUserContext.Provider>
    </UserContext.Provider>
  )
}

