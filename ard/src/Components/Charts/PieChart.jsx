import Chart from "chart.js/auto";
import React from "react";
import { Pie,Line,Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { useState } from "react";
Chart.register(CategoryScale);

function PieChart() {
  const data = {
    labels: ["Red", "Blue"],
    datasets: [
      {
        label: "Popularity of colours",
        data: [55, 96],
        // you can set indiviual colors for each bar

        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
      <Pie
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020",
            },
          },
        }}
      />
    </div>
  );
}

export default PieChart;
