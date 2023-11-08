import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

export default function DashboardBackButton() {
  return (
    <Link to="/dashboard">
      <FaArrowLeft />
      Zum Dashboard
    </Link>
  );
}
