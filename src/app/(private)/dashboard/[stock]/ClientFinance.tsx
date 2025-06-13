"use client";

import { IFinanceQuoteResponse } from "@/app/utils/types/finance.type";
import { Avatar, Box, Chip, Typography } from "@mui/material";

export const ClientFinance = ({
  ticker,
}: {
  ticker: IFinanceQuoteResponse;
}) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Chip
        avatar={
          <Avatar
            src={ticker.results[0].logourl}
            alt={ticker.results[0].symbol}
            sx={{ width: 28, height: 28, bgcolor: "background.paper" }}
          />
        }
        label={
          <Typography variant="subtitle1" fontWeight={700}>
            {ticker.results[0].symbol}
          </Typography>
        }
        sx={{
          mt: 1,
          px: 2,
          py: 1,
          fontSize: 18,
          bgcolor: "background.paper",
          borderRadius: "16px",
          boxShadow: 1,
        }}
      />
    </Box>
  );
};
