import React, { useCallback } from "react";

export const useUserData = () => {
  const getUserData = useCallback(() => {
    return JSON.parse(localStorage.getItem("userInfo"));
  }, []);

  const setUserData = useCallback((user) => {
    localStorage.setItem("userInfo", JSON.stringify(user));
  }, []);

  return {
    userData: getUserData(),
    getUserData,
    setUserData,
  };
};
