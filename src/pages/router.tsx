import { BrowserRouter, Route, Routes } from "react-router";
import { SessionsPage, PaymentPage, ErrorPage, CharacterDetailPage } from ".";
import RickAndMortyPage from "./RickAndMortyPage";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SessionsPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="/rick-and-morty" element={<RickAndMortyPage />} />
      <Route path="/character/:id" element={<CharacterDetailPage />} />
    </Routes>
  </BrowserRouter>
);
