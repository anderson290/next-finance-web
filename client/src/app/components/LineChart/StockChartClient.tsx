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
  ticker: {
    symbol: string;
    name: string;
    logoUrl: string;
  };
};

export const StockChartClient = ({ data, ticker }: Props) => {

  const handleTickerAveragePrice = (tickerSymbol: string): number => {

    switch (tickerSymbol) {
      case 'BBAS3': 
        return 24.97; // Example price for PETR4
      case 'BBSE3':   
        return 39.68; // Example price for VALE3
      case 'ITUB4':
        return 30.38; // Example price for ITUB4
      case 'KLBN4':
        return 4.03; // Example price for BBDC3
    }
    return 100; // Example price
  };  

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
      {
        label: 'Average Price',
        data: Array(data.length).fill(handleTickerAveragePrice(ticker.symbol)),
        borderColor: 'rgba(255, 99, 132, 0.8)',
        pointRadius: 0,
        fill: false,
        type: 'line' as const,
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
        Line Chart test
        {/* <Line data={chartData} options={options} /> */}
      </CardContent>
    </Card>
  );
}