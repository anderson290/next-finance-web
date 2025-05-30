'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card, CardContent } from '@mui/material';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
  Legend
);

type StockPoint = {
  date: string;
  close: number;
};

type Props = {
  data: StockPoint[];
  title?: string;
};

export const StockChartClient = ({ data }: Props) => {
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: 'Closing price (R$)',
        data: data.map((item) => item.close),
        borderColor: 'rgba(25, 118, 210, 1)',
        backgroundColor: 'rgba(25, 118, 210, 0.2)',
        tension: 0.3,
      },
    ],
  };

  const options: import('chart.js').ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
      },
    },
  };

  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Line data={chartData} options={options} />
      </CardContent>
    </Card>
  );
}