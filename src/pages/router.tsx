import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import {
  SessionsPage,
  PaymentPage,
  ErrorPage,
  MoviesPage,
  LoginPage,
  RequireAuth,
  ProfilePage,
  RegisterPage,
} from ".";

import { useDispatch } from "react-redux";
import { initializeAuth } from "../redux/authSlice";

export const Router = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(initializeAuth());
    })();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MoviesPage />} />
        <Route path="/sessions/:movieId" element={<SessionsPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<RequireAuth />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
