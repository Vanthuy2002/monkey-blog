import { useEffect, useState } from 'react';
import { createContext, useContext } from 'react';
import { toast } from 'react-toastify';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
const AuthContext = createContext();

const AuthProvider = (props) => {
  const [accounts, setAccounts] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAccounts(user);
      }
    });
  }, []);

  const users = { accounts, setAccounts };
  return <AuthContext.Provider {...props} value={users}></AuthContext.Provider>;
};

export const useAuthCtx = () => {
  const context = useContext(AuthContext);
  if (context === 'undefined') {
    toast.warn('Invalid auth value');
  }
  return context;
};

export default AuthProvider;
