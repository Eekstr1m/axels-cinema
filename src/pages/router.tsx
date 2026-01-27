import { BrowserRouter, Route, Routes } from "react-router";
import { SessionsPage, PaymentPage, ErrorPage, MoviesPage } from ".";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MoviesPage />} />
      <Route path="/sessions/:movieId" element={<SessionsPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
);
