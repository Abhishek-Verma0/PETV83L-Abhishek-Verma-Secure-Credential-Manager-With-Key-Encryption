import React, { createContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // see if token exsist or is valid
  

}

