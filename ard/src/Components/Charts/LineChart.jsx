import React from 'react'
import { Line } from "react-chartjs-2";
function LineChart() {
    const data = {
        labels: [10,34,34,343,43,434,3,43,4,],
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      };

  return (
    <div className="chart-container">
    <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
    <Line
      data={data}
      options={{
        plugins: {
          title: {
            display: true,
            text: "Users Gained between 2016-2020"
          },
          legend: {
            display: false
          }
        }
      }}
    />
  </div>
  )
}

export default LineChart