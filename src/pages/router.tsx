import { BrowserRouter, Route, Routes } from "react-router";
import { SessionsPage, PaymentPage, ErrorPage } from ".";
import DataGridPage from "./DataGridPage";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SessionsPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="/data" element={<DataGridPage />} />
    </Routes>
  </BrowserRouter>
);
