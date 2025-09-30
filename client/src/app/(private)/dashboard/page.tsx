"use client";

import { useState, useEffect, useCallback } from "react";
import { Box, Button, Modal, Typography, Checkbox, TextField } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import SelectedStocks from "@/app/components/SelectedStocks";

export default function Page() {
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedStocks, setTempSelectedStocks] = useState<string[]>([]);
  const [tickers, setTickers] = useState<any[]>([]);
  const [displayedTickers, setDisplayedTickers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchTickers = async () => {
      try {
        const response = await fetch("https://brapi.dev/api/quote/list");
        const data = await response.json();
        if (data.stocks) {
          setTickers(data.stocks);
          setDisplayedTickers(data.stocks.slice(0, itemsPerPage)); // Load the first 20 items initially
        }
      } catch (error) {
        console.error("Failed to fetch tickers from brapi:", error);
      }
    };

    fetchTickers();
  }, []);

  const handleSearch = (query: string) => {
    const filteredTickers = tickers.filter((ticker) =>
      ticker.name.toLowerCase().includes(query.toLowerCase()) ||
      ticker.stock.toLowerCase().includes(query.toLowerCase())
    );
    setDisplayedTickers(filteredTickers.slice(0, itemsPerPage));
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleToggleStock = (symbol: string) => {
    if (tempSelectedStocks.includes(symbol)) {
      setTempSelectedStocks((prev) => prev.filter((stock) => stock !== symbol));
    } else {
      setTempSelectedStocks((prev) => [...prev, symbol]);
    }
  };

  const handleConfirmSelection = () => {
    setSelectedStocks((prev) => [...prev, ...tempSelectedStocks.filter((stock) => !prev.includes(stock))]);
    setTempSelectedStocks([]);
    handleCloseModal();
  };

  const handleRemoveStock = (symbol: string) => {
    setSelectedStocks((prev) => prev.filter((stock) => stock !== symbol));
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedTickers(tickers.slice(startIndex, endIndex));
  };

  return (
    <Box>
      {/* Top Bar */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight={600}>
          Dashboard
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          + Add Stocks
        </Button>
      </Box>

      {/* Selected Stocks with CandleCharts */}
      <SelectedStocks selectedStocks={selectedStocks} onRemoveStock={handleRemoveStock} />

      {/* Modal for Multi-Select */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxHeight: "90%",
            overflowY: "auto",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            Select Stocks
          </Typography>

          {/* Search Field */}
          <Box mb={3}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search for a stock..."
              onChange={(e) => handleSearch(e.target.value)}
            />
          </Box>

          {/* Stock Grid with Pagination */}
          <Box
            display="grid"
            gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" }}
            gap={2}
          >
            {displayedTickers.map((ticker) => (
              <Box
                key={ticker.stock}
                display="flex"
                alignItems="center"
                gap={2}
                p={2}
                borderRadius={2}
                sx={{ cursor: "pointer" }}
                onClick={() => handleToggleStock(ticker.stock)}
              >
                <Checkbox
                  checked={tempSelectedStocks.includes(ticker.stock)}
                  sx={{ marginRight: 2 }}
                  onChange={() => {}}
                />
                <img
                  src={ticker.logo || "https://via.placeholder.com/40"}
                  alt={ticker.stock}
                  style={{ width: 40, height: 40, objectFit: "contain" }}
                />
                <Typography>{ticker.stock}</Typography>
              </Box>
            ))}
          </Box>

          {/* Pagination */}
          <Box mt={3} display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(tickers.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>

          <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleConfirmSelection}>
              OK
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}