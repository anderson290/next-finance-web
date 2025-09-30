"use client";

import React, { useEffect, useRef, useState } from "react";
import { createChart, CandlestickData } from "lightweight-charts";
import { IStockChartProps } from "../LineChart";
import { Box, Card, IconButton, Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useRouter } from "next/navigation";

export default function CandleChart({ ticker }: any) {

  const router = useRouter();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartInstance, setChartInstance] = useState<any>(null);
  const [candleSeries, setCandleSeries] = useState<any>(null);
  const [historycalDataPrice, setHistorycalDataPrice] = useState<any[]>([]);
  const [result, setResult] = useState<any>(null);
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
    if (!candleSeries) return;

    const fetchCandles = async () => {
      try {
        const res = await fetch(`/api/brapi?symbol=${ticker.stock}`);
        const json = await res.json();

        const historicalData = json?.historicalDataPrice;

        if (!historicalData) {
          console.error(
            "Historical data not found in the internal API response"
          );
          return;
        }

        setHistorycalDataPrice(historicalData);
        setResult(json);

        const candles: CandlestickData[] = historicalData.map((item: any) => ({
          time: item.date,
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
        }));

        candleSeries.setData(candles);
      } catch (error) {
        console.error("Error fetching data from internal API", error);
      }
    };

    fetchCandles();
  }, [candleSeries]);

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
              src={result?.logourl || ticker.logoUrl}
              alt={`${ticker.symbol} logo`}
              style={{ width: 32, height: 32, marginRight: 8 }}
            />
            <span>{ticker.name}</span>
          </Box>
        </Box>
        <IconButton
          aria-label="Open in dashboard"
          onClick={() => router.push(`/dashboard/${ticker.symbol}`)}
          size="small"
          sx={{ color: "#DDD" }}
        >
          <OpenInNewIcon />
        </IconButton>
        <Typography>Last 30 days</Typography>
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
