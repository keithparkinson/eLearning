import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../services/useLogin";
/* eslint-disable react/prop-types */
export default function ProttectedRoute() {
  const { data: user, isLoading } = useUser();
  const [isAuth, setIsAuth] = useState(false);

  // console.log(isAuth);
  console.log(isLoading);

  const navigate = useNavigate();

  useEffect(() => {
    if (user !== undefined && !isLoading) {
      setIsAuth(true);
    }
  }, [user, isAuth, isLoading, navigate]);

  // useEffect(() => {
  //   if (user === undefined && !isLoading) {
  //     localStorage.removeItem("user");
  //     setIsAuth(false);
  //     navigate("/login");
  //   }
  // }, [user, navigate, isLoading]);

  if (isLoading) {
    return <span>...loading</span>;
  }

  console.log(isLoading);
  console.log(user);

  // if (isAuth) {
  //   return <Outlet />;
  // }
  return <Outlet />;
} /* eslint-disable react/prop-types */
