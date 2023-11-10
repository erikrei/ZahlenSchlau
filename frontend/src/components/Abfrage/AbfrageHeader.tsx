import React from "react";

import { useSearchParams } from "react-router-dom";

import DashboardBackButton from "../util/DashboardBackButton";

type THeaderProps = {
  operation?: string;
};

export default function AbfrageHeader({ operation }: THeaderProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamQuery = searchParams.get("query");

  return (
    <header>
      <DashboardBackButton />
      <h1>
        Abfrage {operation}
        {searchParamQuery && (
          <span>{searchParamQuery === "random" && "Zufall"}</span>
        )}
      </h1>
    </header>
  );
}
