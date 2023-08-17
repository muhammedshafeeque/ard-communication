import React from "react";
import PieChart from "../../Components/Charts/PieChart";
import { BarChart } from "../../Components/Charts/BarChart";
function Home() {
  return (
    <div>
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-6">
            <PieChart />
          </div>
          <div className="col-md-6">
            <BarChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
