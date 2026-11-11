import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./styles/site.css";

// Les pages sont pré-rendues en HTML à la compilation (scripts/ssg.js) :
// Google et les aperçus de liens lisent le contenu complet sans JavaScript.
// Si la langue affichée est le français (version pré-rendue), React
// « hydrate » ce HTML ; sinon il reconstruit la page dans la bonne langue.
const container = document.getElementById("root");
const params = new URLSearchParams(window.location.search);
let lang = params.get("lang");
if (!lang) { try { lang = localStorage.getItem("tamini_lang"); } catch (e) { lang = null; } }
const app = (
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);

if (container.hasChildNodes() && (!lang || lang === "fr")) {
  ReactDOM.hydrateRoot(container, app);
} else {
  container.innerHTML = "";
  ReactDOM.createRoot(container).render(app);
}
