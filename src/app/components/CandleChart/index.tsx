"use client";

import React, { useEffect, useRef, useState } from "react";
import { createChart, CandlestickData } from "lightweight-charts";
import { IStockChartProps } from "../LineChart";

export default function CandleChart({ticker}: IStockChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartInstance, setChartInstance] = useState<any>(null);
  const [candleSeries, setCandleSeries] = useState<any>(null);
  const [historycalDataPrice, setHistorycalDataPrice] = useState<any[]>([]);

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
        const res = await fetch("/api/brapi");
        const json = await res.json();

        console.log("Dados recebidos da API interna:", json);

        const historicalData = json.results[0]?.historicalDataPrice;

        if (!historicalData) {
          console.error(
            "Dados históricos não encontrados no retorno da API interna"
          );
          return;
        }

        setHistorycalDataPrice(historicalData);

        const candles: CandlestickData[] = historicalData.map((item: any) => ({
          time: item.date, // YYYY-MM-DD
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
        }));

        candleSeries.setData(candles);
      } catch (error) {
        console.error("Erro ao buscar dados da API interna", error);
      }
    };

    fetchCandles();
  }, [candleSeries]);

  return (
    <div
      style={{
        width: "100%",
        height: 320,
        backgroundColor: "#181818",
        padding: "10px",
      }}
    >
      <div ref={chartContainerRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
