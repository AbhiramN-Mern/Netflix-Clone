import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, signup as fbSignup, login as fbLogin, logout as fbLogout, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      setLoading(false);
      if (u && !u.displayName) {
        (async () => {
          try {
            const q = query(collection(db, "users"), where("uid", "==", u.uid));
            const snap = await getDocs(q);
            if (!snap.empty) {
              const doc = snap.docs[0].data();
              setProfile(doc);
              setUser(prev => prev ? { ...prev, displayName: doc.name } : prev);
            } else {
              setProfile(null);
            }
          } catch (err) {
            console.error('failed to load profile', err);
          }
        })();
      } else {
        setProfile(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const signup = async (name, email, password) => {
    return fbSignup(name, email, password);
  };

  const login = async (email, password) => {
    return fbLogin(email, password);
  };

  const logout = async () => {
    return fbLogout();
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};

export default AuthContext;
