import React from "react";
import PieChart from "../../Components/Charts/PieChart";
import { BarChart } from "../../Components/Charts/BarChart";
import LineChart from "../../Components/Charts/LineChart";

function AdminHome() {
  return (
    <div>
      <LineChart/>
      <BarChart/>
    </div>
  );
}

export default AdminHome;
