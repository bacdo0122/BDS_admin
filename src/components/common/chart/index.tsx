import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface PriceChartProps {
  data: {
    date: string;
    price: number;
  }[];
}
/* eslint-disable react/prop-types */
const PriceChart: React.FC<PriceChartProps>  = ({data}:PriceChartProps) => {
  // Cấu hình dữ liệu cho biểu đồ 
  const chartData = {
    labels: data.map((entry) => entry.date),
    datasets: [
      {
        label: 'Giá cả theo thời gian',
        data: data.map((entry) => entry.price),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  // Cấu hình tùy chọn cho biểu đồ
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: 'Biến động giá cả theo thời gian',
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default PriceChart;