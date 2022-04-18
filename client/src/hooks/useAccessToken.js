import axios from "../api/axios";
import useAuth from "./useAuth";

const useAccessToken = () => {
  const { setAuth } = useAuth();

  const access = async () => {
    const response = await axios.get("/access", {
      withCredentials: true,
    });

    setAuth((prev) => {
      return { ...prev, accessToken: response.data.accessToken };
    });

    return response.data.accessToken;
  };

  return access;
};

export default useAccessToken;
