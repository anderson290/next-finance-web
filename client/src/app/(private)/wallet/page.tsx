"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import WalletCard from "../../components/WalletCard";

let bbCredentials: { clientId: string; clientSecret: string } | null = null;

const mockInvestmentData = {
  totalInvested: "R$ 150,000.00",
  stocks: [
    { name: "PETR4", quantity: 100, value: "R$ 30,000.00" },
    { name: "VALE3", quantity: 50, value: "R$ 50,000.00" },
  ],
  funds: [
    { name: "Fundo Imobiliário XPTO", value: "R$ 40,000.00" },
    { name: "Fundo Renda Fixa ABC", value: "R$ 30,000.00" },
  ],
};

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({ clientId: "", clientSecret: "" });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAuthenticate = () => {
    bbCredentials = {
      clientId: formData.clientId,
      clientSecret: formData.clientSecret,
    };

    setIsAuthenticated(true);
    handleCloseModal();
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        backgroundColor: "#121212",
        minHeight: "100vh",
        padding: 32,
      }}
    >
      <WalletCard
        name="Banco do Brasil"
        value={isAuthenticated ? mockInvestmentData.totalInvested : "R$ 0,00"}
        logo="https://apoio.developers.bb.com.br/assets/img/logo.png"
        color="#FEEA00"
        onClick={handleOpenModal}
      />

      <WalletCard isEmpty />

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            Autenticação Banco do Brasil
          </Typography>
          <TextField
            label="Client ID"
            name="clientId"
            fullWidth
            margin="normal"
            value={formData.clientId}
            onChange={handleInputChange}
          />
          <TextField
            label="Client Secret"
            name="clientSecret"
            type="password"
            fullWidth
            margin="normal"
            value={formData.clientSecret}
            onChange={handleInputChange}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleAuthenticate}
          >
            Autenticar
          </Button>
        </Box>
      </Modal>

      {isAuthenticated && (
        <Box
          sx={{
            mt: 4,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Card sx={{ bgcolor: "#1e1e1e", color: "#fff" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Ações
              </Typography>
              {mockInvestmentData.stocks.map((stock, index) => (
                <Typography key={index}>
                  {stock.name}: {stock.quantity} ações - {stock.value}
                </Typography>
              ))}
            </CardContent>
          </Card>
          <Card sx={{ bgcolor: "#1e1e1e", color: "#fff" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Fundos
              </Typography>
              {mockInvestmentData.funds.map((fund, index) => (
                <Typography key={index}>
                  {fund.name}: {fund.value}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Box>
      )}
    </div>
  );
}