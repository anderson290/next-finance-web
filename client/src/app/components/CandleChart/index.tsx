"use client";

import React, { useEffect, useRef, useState } from "react";
import { createChart, CandlestickData } from "lightweight-charts";
import { Box, Card, IconButton, MenuItem, Select, Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useRouter } from "next/navigation";
import { Stock } from "../../context/StocksContext";

function calcularPrecoJustoBazin(dividendoAnual: number, dividendYieldIdeal: number = 0.06): number {
  if (dividendYieldIdeal <= 0) {
    throw new Error("O Dividend Yield Ideal deve ser maior que zero.");
  }
  return dividendoAnual / dividendYieldIdeal;
}

interface HistoricalData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface ApiResponse {
  chart: {
    result: [
      {
        timestamp: number[];
        indicators: {
          quote: [
            {
              open: number[];
              high: number[];
              low: number[];
              close: number[];
            }
          ];
        };
      }
    ];
  };
}

export default function CandleChart({ ticker }: { ticker: Stock }) {
  const router = useRouter();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartInstance, setChartInstance] = useState<any>(null);
  const [candleSeries, setCandleSeries] = useState<any>(null);
  const [historycalDataPrice, setHistorycalDataPrice] = useState<any[]>([]);
  const [result, setResult] = useState<any>(null);
  const [selectedMethod, setSelectedMethod] = useState<string>("none");

  useEffect(() => {
    if (historycalDataPrice && chartInstance) {
      chartInstance?.timeScale()?.fitContent();
    }
  }, [historycalDataPrice, chartInstance]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      rightPriceScale: {
        visible: true,
        borderColor: "#71649C",
      },
      layout: {
        background: { color: "#181818" },
        textColor: "#DDD",
      },
      grid: {
        vertLines: { color: "#222" },
        horzLines: { color: "#222" },
      },
    });

    const candleSeries = chart.addCandlestickSeries();
    setChartInstance(chart);
    setCandleSeries(candleSeries);
    chart.timeScale().scrollToPosition(0, false);
    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current!.clientWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  useEffect(() => {
    if (!candleSeries || !chartInstance) return;

    const fetchCandles = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/stocks?ticker=${ticker.stock}`);
        const json: ApiResponse = await res.json();

        const historicalData = json.chart.result[0].indicators.quote[0];
        const timestamps = json.chart.result[0].timestamp;

        if (!historicalData || !timestamps) {
          console.error("Historical data not found in the API response");
          return;
        }

        const candles: HistoricalData[] = timestamps.map((time, index) => ({
          time,
          open: historicalData.open[index],
          high: historicalData.high[index],
          low: historicalData.low[index],
          close: historicalData.close[index],
        }));

        setHistorycalDataPrice(candles);
        candleSeries.setData(candles);

        if (selectedMethod === "bazin" && result?.dividendYield) {
          const precoJusto = calcularPrecoJustoBazin(result.dividendYield);
          const bazinLineSeries = chartInstance.addLineSeries({
            color: "#00FF00",
            lineWidth: 2,
          });
          const firstTime = candles[0]?.time || 0;
          const lastTime = candles[candles.length - 1]?.time || 0;
          bazinLineSeries.setData([
            { time: firstTime, value: precoJusto },
            { time: lastTime, value: precoJusto },
          ]);
        }
      } catch (error) {
        console.error("Error fetching data from the API", error);
      }
    };

    fetchCandles();
  }, [candleSeries, chartInstance, selectedMethod]);

  return (
    <Card sx={{ width: "100%", margin: "0 auto", padding: 2 }}>
      <Box
        mb={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Box display="flex" alignItems="center">
            <img
              src={result?.logourl || ticker.logo}
              alt={`${ticker.stock} logo`}
              style={{ width: 32, height: 32, marginRight: 8 }}
            />
            <span>{ticker.name}</span>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <Select
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              size="small"
              sx={{ color: "#DDD", backgroundColor: "#282828" }}
            >
              <MenuItem value="none">Nenhum</MenuItem>
              <MenuItem value="bazin">Preço Justo (Bazin)</MenuItem>
            </Select>
            <IconButton
              aria-label="Open in dashboard"
              onClick={() => router.push(`/dashboard/${ticker.stock}`)}
              size="small"
              sx={{ color: "#DDD" }}
            >
              <OpenInNewIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <div
        style={{
          width: "100%",
          height: 320,
          backgroundColor: "#181818",
          padding: "10px",
        }}
      >
        <div
          ref={chartContainerRef}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </Card>
  );
}