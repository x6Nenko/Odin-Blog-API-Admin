import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(localStorage.getItem("token") ? true : false);

  const updateIsLogged = () =>{
    const storedToken = localStorage.getItem('token');
    storedToken ? setIsLogged(true) : setIsLogged(false);
  };

  return <AuthContext.Provider value={{ isLogged, updateIsLogged }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
