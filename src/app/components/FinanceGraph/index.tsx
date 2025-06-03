"use client";

import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const barsData = [
  { label: "Jan", value: 40, color: "#4caf50" },
  { label: "Fev", value: 60, color: "#66bb6a" },
  { label: "Mar", value: 80, color: "#81c784" },
  { label: "Abr", value: 70, color: "#a5d6a7" },
  { label: "Mai", value: 90, color: "#c8e6c9" },
];

const GRAPH_HEIGHT = 200; // pixels

export default function FinanceGraph() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        px: 2,
      }}
    >
      <Typography variant="h4" fontWeight="bold" mb={8} color="textPrimary">
        Simulate and track the Financial Growth of your stocks
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          gap: 2,
          width: "80%",
          maxWidth: 600,
          height: GRAPH_HEIGHT,
          borderBottom: "2px solid #ccc",
          paddingBottom: 2,
        }}
      >
        {barsData.map(({ label, value, color }) => (
          <Box key={label} sx={{ flex: 1, textAlign: "center" }}>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: (value / 100) * GRAPH_HEIGHT }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{
                backgroundColor: color,
                borderRadius: 4,
                width: "60%",
                margin: "0 auto",
                height: 0,
              }}
            />
            <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
              {label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
