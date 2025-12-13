// Les dialogues sont inspirés de la fiche Dialog Customization : https://mui.com/material-ui/react-dialog/
import { useContext } from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";

import { LoginContext } from "../../contexts/LoginContext";

import axios from "axios";

import type { IVinyleProps } from "../MenuPrincipal";

interface IVinyleDialogProps {
  open: boolean;
  onClose: () => void;
  vinyle: IVinyleProps | null;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(3),
  },
  "& .MuiDialog-paper": {
    backgroundColor: "rgba(61, 47, 40, 0.95)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(212, 165, 116, 0.3)",
    borderRadius: 16,
    maxWidth: 700,
  },
}));

export function VinyleDialog({ open, onClose, vinyle }: IVinyleDialogProps) {
  const { isLoggedIn, token } = useContext(LoginContext);
  const navigate = useNavigate();
  if (!vinyle) return null;

  // Code Emprunté
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    if (seconds) return `${mins}:${secs.toString().padStart(2, "0")}`;
    else return "Durée Non Trouvée";
  };

  const formatDate = (date: Date | string) => {
    try {
      const dateObj = typeof date === "string" ? new Date(date) : date;
      return dateObj.toLocaleDateString("fr-CA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return "Date inconnue";
    }
  };

  const totalDuration = vinyle.chansons.reduce(
    (acc, chanson) => acc + chanson.duree,
    0
  );

  // Fin du code emprunté

  const formulaireModifier = async () => {
    navigate("/modifier", { state: { vinyle } });
  };

  const suppressionVinyle = async () => {
    try {
      await axios.delete(
        `https://vinylesapi-bke0b0evdcdqdwb2.canadacentral-01.azurewebsites.net/api/vinyles/${vinyle._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      window.location.reload();
    } catch (error) {
      console.error("Erreur en supprimant le vinyle :", error);
    }
  };

  return (
    <BootstrapDialog onClose={onClose} open={open}>
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          color: "#F5E6D3",
          fontWeight: "bold",
          fontSize: "1.5rem",
        }}
      >
        {vinyle.titre}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "#D4A574",
          "&:hover": {
            backgroundColor: "rgba(212, 165, 116, 0.1)",
          },
        }}
      >
        ✕
      </IconButton>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Album Cover and Artist */}
          <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
            <Box
              component="img"
              src={vinyle.urlImage}
              alt={vinyle.titre}
              sx={{
                width: 200,
                height: 200,
                objectFit: "cover",
                borderRadius: 2,
                border: "2px solid rgba(212, 165, 116, 0.4)",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)",
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                sx={{ color: "#C4A57B", marginBottom: 1 }}
              >
                Artiste
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: "#F5E6D3", fontWeight: "bold", marginBottom: 2 }}
              >
                {vinyle.artiste}
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "#C4A57B", marginBottom: 0.5 }}
              >
                Date de parution
              </Typography>
              <Typography sx={{ color: "#F5E6D3", marginBottom: 2 }}>
                {formatDate(vinyle.date_parution)}
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "#C4A57B", marginBottom: 0.5 }}
              >
                Statut
              </Typography>
              <Chip
                label={vinyle.possession ? "En possession" : "Non possédé"}
                sx={{
                  backgroundColor: vinyle.possession
                    ? "rgba(76, 175, 80, 0.2)"
                    : "rgba(244, 67, 54, 0.2)",
                  color: vinyle.possession ? "#81C784" : "#E57373",
                  border: `1px solid ${
                    vinyle.possession
                      ? "rgba(76, 175, 80, 0.4)"
                      : "rgba(244, 67, 54, 0.4)"
                  }`,
                  fontWeight: "bold",
                }}
              />
            </Box>
          </Box>

          <Divider sx={{ backgroundColor: "rgba(212, 165, 116, 0.2)" }} />

          {/* Genres */}
          <Box>
            <Typography
              variant="h6"
              sx={{ color: "#F5E6D3", marginBottom: 1.5, fontWeight: "bold" }}
            >
              Genres
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {vinyle.genres.map((genre, index) => (
                <Chip
                  key={index}
                  label={genre}
                  sx={{
                    backgroundColor: "rgba(212, 165, 116, 0.25)",
                    color: "#D4A574",
                    border: "1px solid rgba(212, 165, 116, 0.4)",
                    fontWeight: 500,
                  }}
                />
              ))}
            </Box>
          </Box>

          <Divider sx={{ backgroundColor: "rgba(212, 165, 116, 0.2)" }} />

          {/* Track List */}
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 1.5,
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#F5E6D3", fontWeight: "bold" }}
              >
                Liste des pistes ({vinyle.chansons.length})
              </Typography>
              <Typography sx={{ color: "#C4A57B", fontSize: "0.9rem" }}>
                Durée totale: {formatDuration(totalDuration)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {vinyle.chansons.map((chanson, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 1.5,
                    backgroundColor: "rgba(212, 165, 116, 0.1)",
                    borderRadius: 1,
                    border: "1px solid rgba(212, 165, 116, 0.2)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "rgba(212, 165, 116, 0.2)",
                      transform: "translateX(5px)",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography
                      sx={{
                        color: "#D4A574",
                        fontWeight: "bold",
                        minWidth: 30,
                      }}
                    >
                      {index + 1}.
                    </Typography>
                    <Typography sx={{ color: "#F5E6D3" }}>
                      {chanson.nom}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: "#C4A57B",
                      fontSize: "0.9rem",
                      fontFamily: "monospace",
                    }}
                  >
                    {formatDuration(chanson.duree)}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Divider sx={{ backgroundColor: "rgba(212, 165, 116, 0.2)" }} />

          <Box>
            {isLoggedIn && (
              <>
                <Button
                  onClick={formulaireModifier}
                  sx={{
                    backgroundColor: "rgba(14, 180, 218, 0.2)",
                    color: "#F5E6D3",
                    border: `1px solid rgba(54, 68, 160, 0.4)`,
                    fontWeight: "bold",
                    marginRight: "25px",
                  }}
                >
                  Modifier
                </Button>
                <Button
                  onClick={suppressionVinyle}
                  sx={{
                    backgroundColor: "rgba(218, 14, 14, 0.2)",
                    color: "#F5E6D3",
                    border: `1px solid rgba(160, 72, 54, 0.4)`,
                    fontWeight: "bold",
                  }}
                >
                  Supprimer
                </Button>
              </>
            )}
          </Box>
        </Box>
      </DialogContent>
    </BootstrapDialog>
  );
}
