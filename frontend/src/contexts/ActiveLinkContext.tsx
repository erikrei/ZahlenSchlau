import React from "react";

type TActiveLinkContext = {
  activeLink: string;
  setActiveLink: React.Dispatch<React.SetStateAction<string>>;
};

const ActiveLinkContext = React.createContext<TActiveLinkContext | null>(null);

export default function ActiveLinkProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeLink, setActiveLink] = React.useState("Grundrechenarten");

  return (
    <ActiveLinkContext.Provider value={{ activeLink, setActiveLink }}>
      {children}
    </ActiveLinkContext.Provider>
  );
}

export function useActiveLinkContext() {
  const context = React.useContext(ActiveLinkContext);

  if (!context) {
    throw new Error(
      "ActiveLinkContext muss im ActiveLinkProvider genutzt werden"
    );
  }

  return context;
}
