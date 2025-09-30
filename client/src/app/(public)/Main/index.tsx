"use client";
import {
  Box,
  Typography,
  Container,
  Paper,
  Divider,
  IconButton,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useState } from "react";
import GitHubSignInButton from "../../components/GithubButton";
const BG_IMAGE =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80"; // Exemplo: pessoas em escritório

export const Main = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <main
      style={{
        overflowX: "hidden",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          overflowX: "hidden",
          boxSizing: "border-box",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.85),rgba(0,0,0,0.85)), url(${BG_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          color: "#fff",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 24,
            right: 32,
            zIndex: 10,
          }}
        >
          <IconButton
            aria-label="toggle dark mode"
            onClick={() => setDarkMode((prev) => !prev)}
            sx={{
              color: "#fff",
              bgcolor: "rgba(0,0,0,0.3)",
              "&:hover": { bgcolor: "rgba(0,0,0,0.5)" },
              boxShadow: 2,
            }}
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>

        <Container maxWidth="lg" sx={{ zIndex: 2 }}>
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            alignItems="center"
            justifyContent="space-between"
            gap={8}
          >
            <Box
              flex={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                alignItems: { xs: "center", md: "flex-start" },
                textAlign: { xs: "center", md: "left" },
                color: "#fff",
              }}
            >
              <Typography
                variant="h2"
                fontWeight={800}
                sx={{
                  letterSpacing: -2,
                  mb: 2,
                  color: "#fff",
                  textShadow: "0 2px 16px rgba(0,0,0,0.5)",
                }}
              >
                Next Finance
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: "#e0e0e0",
                  maxWidth: 500,
                  mb: 2,
                  textShadow: "0 1px 8px rgba(0,0,0,0.3)",
                }}
              >
                Projeto de portfólio criado para estudo de Next.js e do mercado
                financeiro — não constitui recomendação de investimento.
              </Typography>

              <Divider
                sx={{
                  width: 80,
                  borderColor: "#fff",
                  borderBottomWidth: 3,
                  mb: 2,
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  color: "#bdbdbd",
                  maxWidth: 400,
                  mb: 2,
                }}
              >
                Controle, visualize e analise seus ativos com dashboards
                profissionais e integração com as principais plataformas do
                mercado.
              </Typography>
            </Box>

            <Box flex={1} minWidth={320}>
              <Paper
                elevation={8}
                sx={{
                  p: 5,
                  borderRadius: 4,
                  background: darkMode
                    ? "rgba(20,20,20,0.98)"
                    : "rgba(255,255,255,0.98)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 3,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                  color: darkMode ? "#fff" : "#222",
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight={700}
                  color={darkMode ? "#fff" : "#181818"}
                  mb={1}
                  sx={{ letterSpacing: -1 }}
                >
                  Acesse sua conta
                </Typography>
                <Typography
                  variant="body2"
                  color={darkMode ? "#fff" : "#181818"}
                  mb={2}
                  align="center"
                >
                  Faça login com sua conta GitHub para acessar o painel
                  financeiro.
                </Typography>
                <GitHubSignInButton />
              </Paper>
            </Box>
          </Box>
        </Container>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(120deg, rgba(0,0,0,0.7) 60%, rgba(44,62,80,0.3) 100%)",
            zIndex: 1,
          }}
        />
      </Box>

      <Box
        sx={{
          background: darkMode
            ? "linear-gradient(180deg, #111 0%, #232323 100%)"
            : "linear-gradient(180deg, #fff 0%, #f5f7fa 100%)",
          py: { xs: 6, md: 10 },
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={2}
            sx={{
              p: 4,
              borderRadius: 3,
              background: darkMode ? "#181818" : "#fff",
              color: darkMode ? "#fff" : "#222",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" fontWeight={600} mb={2}>
              Transparência e responsabilidade
            </Typography>
            <Typography
              variant="body2"
              color={darkMode ? "#fff" : "#181818"}
              mb={2}
            >
              O Next Finance utiliza heurísticas para algumas análises e
              recomendações, baseando-se em dados públicos da API{" "}
              <b>brapi.dev</b>. As informações apresentadas não são 100%
              precisas ou recomendações de investimento. Sempre consulte fontes
              oficiais e profissionais do mercado financeiro.
            </Typography>
          </Paper>
        </Container>
      </Box>

      <Box
        component="footer"
        sx={{
          background: darkMode ? "#111" : "#222",
          color: "#fff",
          py: 3,
          textAlign: "center",
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <GitHubIcon sx={{ fontSize: 28 }} />
          <Typography variant="body2">
            Veja o repositório completo no{" "}
            <a
              href="https://github.com/anderson290/next-finance-web"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#fff", textDecoration: "underline" }}
            >
              GitHub
            </a>
          </Typography>
        </Container>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={1}
        >
          <Typography
            variant="body2"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <span
              style={{ display: "flex", alignItems: "center", marginRight: 4 }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                style={{ marginRight: 4 }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M15.5 15C14.5 16 13 16 12 16C10 16 8 14 8 12C8 10 10 8 12 8C13 8 14.5 8 15.5 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            {new Date().getFullYear()} — Criado por Anderson Nunes
          </Typography>
        </Box>
      </Box>
    </main>
  );
};
