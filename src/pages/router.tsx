import { BrowserRouter, Route, Routes } from "react-router";
import { SessionsPage, PaymentPage, ErrorPage, ChartPage } from ".";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SessionsPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="/chart" element={<ChartPage />} />
    </Routes>
  </BrowserRouter>
);
