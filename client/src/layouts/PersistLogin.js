import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAccessToken from "../hooks/useAccessToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const access = useAccessToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyAccessToken = async () => {
      try {
        await access();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyAccessToken() : setIsLoading(false);
  }, []);

  return <div>{isLoading ? <div>Loading...</div> : <Outlet />}</div>;
};

export default PersistLogin;
