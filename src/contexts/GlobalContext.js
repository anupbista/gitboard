import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

const GlobalContextProvider = (props) => {
  
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [ user, setUser ] = useState({});
  const [ repo, setRepo ] = useState({});
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleLoading = (loadingState) => {
    setLoading(loadingState)
  }

  const setuser = (user) => {
    setUser(user)
  }

  const toggleSetMobileOpen = () => {
    setMobileOpen(!mobileOpen);
  }

  const toggleMsg = (message) => {
    setMsg(message);
  }

  return (
    <GlobalContext.Provider value={{loading, toggleLoading: toggleLoading, msg, setMsg: toggleMsg, user, setuser: setuser, mobileOpen, toggleSetMobileOpen: toggleSetMobileOpen, repo, setRepo: setRepo}}>
      {props.children}
    </GlobalContext.Provider>
  );
}
 
export default GlobalContextProvider;