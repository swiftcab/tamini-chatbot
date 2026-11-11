import React, { createContext, useCallback, useContext, useState } from "react";
import QuoteFunnel from "./QuoteFunnel";

// Ouvre le formulaire de devis depuis n'importe quel CTA du site :
//   const { openFunnel } = useFunnel();
//   <button onClick={() => openFunnel("auto", "product_hero")}>…</button>
// slug = null → le visiteur choisit d'abord son produit.
const FunnelCtx = createContext({ openFunnel: () => {}, closeFunnel: () => {} });

export function FunnelProvider({ children }) {
  const [state, setState] = useState(null);
  const openFunnel = useCallback((slug = null, source = "page") => setState({ slug, source, key: Date.now() }), []);
  const closeFunnel = useCallback(() => setState(null), []);
  return (
    <FunnelCtx.Provider value={{ openFunnel, closeFunnel }}>
      {children}
      {state && <QuoteFunnel key={state.key} modal slug={state.slug} source={state.source} onClose={closeFunnel} />}
    </FunnelCtx.Provider>
  );
}

export const useFunnel = () => useContext(FunnelCtx);
