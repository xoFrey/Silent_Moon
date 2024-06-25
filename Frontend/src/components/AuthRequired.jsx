import { useContext, useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { backendUrl } from "../api/api";

import { TokenContext, UserContext } from "../../context/Context";
import LoadingAnimation from "./LoadingAnimation";

const AuthRequired = ({ children }) => {
  const timeoutRef = useRef(null);
  const { token, setToken } = useContext(TokenContext);
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(token ? false : true);
  const [loadingAnimationVisible, setLoadingAnimationVisible] = useState(
    token ? false : true
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (token) return doSilentRefresh(token);

    async function checkLoggedIn() {
      const response = await fetch(`${backendUrl}/api/v1/users/refresh-token`, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();
      if (data.result) {
        setToken(data.result.newAccessToken);
        setUser(data.result.user);
        doSilentRefresh(data.result.newAccessToken);
      } else {
        navigate("/");
      }

      setLoading(false);
    }

    checkLoggedIn();

    function doSilentRefresh(currentAccessToken) {
      const tokenExpiration = calcTokenExpDuration(currentAccessToken);
      timeoutRef.current = setTimeout(async () => {
        try {
          console.log("fetching backend for silent refresh");
          const response = await fetch(
            `${backendUrl}/api/v1/users/refresh-token`,
            {
              method: "POST",
              credentials: "include",
            }
          );

          if (!data.result) navigate("/login");

          const data = await response.json();
          setToken(data.result.newAccessToken);
          setUser(data.result.user);
          doSilentRefresh(data.result.newAccessToken);
        } catch (err) {
          console.log(err);
          navigate("/login");
        }
      }, tokenExpiration);
    }

    function calcTokenExpDuration(accessToken) {
      const tokenPayloadBase64 = accessToken.split(".")[1];
      const tokenPayloadJson = atob(tokenPayloadBase64);
      const tokenPayload = JSON.parse(tokenPayloadJson);
      const duration = tokenPayload.exp - tokenPayload.iat;
      const nextFetchAfter = duration - 30;
      return nextFetchAfter * 1000;
    }

    return () => clearTimeout(timeoutRef.current);
  }, []);
  useEffect(() => {
    if (loading === false) {
      setTimeout(() => {
        setLoadingAnimationVisible(false);
      }, 1500);
    }
  }, [loading]);
  return (
    <>
      {!loading && children}
      {loadingAnimationVisible && (
        <div className="h-screen flex items-center justify-center bg-slate-200 absolute top-0 left-0 bg-white">
          <LoadingAnimation />
        </div>
      )}
    </>
  );
  // else return <>{children}</>;
};

export default AuthRequired;
