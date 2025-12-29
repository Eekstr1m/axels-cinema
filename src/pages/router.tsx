import { BrowserRouter, Route, Routes } from "react-router";
import { SessionsPage, PaymentPage } from ".";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SessionsPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </BrowserRouter>
  );
};
