// Les dialogues sont inspirés de la fiche Dialog Customization : https://mui.com/material-ui/react-dialog/
import { useContext, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { LoginContext } from "../../contexts/LoginContext";

interface IChanson {
  nom: string;
  duree: number;
}

interface IVinyleProps {
  idVinyle: string;
  urlImage: string;
  titre: string;
  artiste: string;
  chansons: IChanson[];
  genres: string[];
  dateParution: Date;
  possession: boolean;
  handleOnClick: (idVinyle: string) => void;
}

// Constants
const DISC_SIZE = 120;
const COVER_SIZE = 130;
const HOLE_SIZE = 35;
const CARD_BG = "#ffffff22";
const DISC_BG = "#1a1a1a";

// Shared styles
const vinylGroovesGradient = `
  repeating-radial-gradient(
    circle at center,
    transparent 0px,
    transparent 2px,
    rgba(0, 0, 0, 0.3) 2px,
    rgba(0, 0, 0, 0.3) 3px
  )
`;

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

function Vinyle(props: IVinyleProps) {
  const [dialogueOuvert, setDialogueOuvert] = useState(false);

  const handleOnClick = () => {
    props.handleOnClick(props.idVinyle);
    setDialogueOuvert(true);
  };

  const handleClose = () => {
    setDialogueOuvert(false);
  };

  return (
    <>
      <Card
        className="vinyl-card"
        sx={{
          backgroundColor: CARD_BG,
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(0, 0, 0, 1)",
          width: 180,
          height: 280,
          borderRadius: 3,
          cursor: "pointer",
          transition: "all 0.3s ease",
          position: "relative",
          overflow: "visible",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.8)",
            backgroundColor: "rgba(61, 47, 40, 0.6)",
            border: "1px solid rgba(212, 165, 116, 0.5)",
          },
          "&:hover .vinyl-disc": {
            animation: "spin 2s linear infinite",
            transform: "translate(-20%, -40%) rotate(0deg)",
            opacity: 1,
          },
          "&:hover .album-cover": {
            transform: "translateX(-25px)",
          },
          "@keyframes spin": {
            "0%": {
              transform: "translate(-20%, -40%) rotate(0deg)",
            },
            "100%": {
              transform: "translate(-20%, -40%) rotate(360deg)",
            },
          },
        }}
        onClick={handleOnClick}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
            paddingBottom: 1,
            position: "relative",
          }}
        >
          {/* Vinyl disc behind */}
          <Box
            className="vinyl-disc"
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: DISC_SIZE,
              height: DISC_SIZE,
              borderRadius: "50%",
              backgroundColor: DISC_BG,
              boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.6)",
              transition: "transform 0.5s ease, opacity 0.5s ease",
              opacity: 0,
            }}
          >
            <Box
              component="img"
              src={props.urlImage}
              alt={props.titre}
              sx={{
                width: DISC_SIZE,
                height: DISC_SIZE,
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />

            {/* Vinyl grooves effect */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: DISC_SIZE,
                height: DISC_SIZE,
                borderRadius: "50%",
                background: vinylGroovesGradient,
                pointerEvents: "none",
              }}
            />

            {/* Center hole */}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: HOLE_SIZE,
                height: HOLE_SIZE,
                borderRadius: "50%",
                backgroundColor: "rgba(61, 47, 40, 0.8)",
                backdropFilter: "blur(5px)",
                border: "3px solid rgba(0, 0, 0, 0.8)",
                boxShadow: "inset 0px 2px 6px rgba(0, 0, 0, 0.5)",
              }}
            />
          </Box>

          {/* Album cover on top */}
          <Box
            className="album-cover"
            sx={{
              position: "relative",
              width: COVER_SIZE,
              height: COVER_SIZE,
              borderRadius: 2,
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.7)",
              overflow: "visible",
              zIndex: 2,
              transition: "transform 0.5s ease",
            }}
          >
            <Box
              component="img"
              src={props.urlImage}
              alt={props.titre}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
            {/* Track count badge */}
            <Box
              className="vinyl-badge"
              sx={{
                position: "absolute",
                top: -8,
                right: -8,
                backgroundColor: "#f6f1efff",
                color: "#2A1810",
                fontWeight: "bold",
                fontSize: "0.75rem",
                borderRadius: "50%",
                width: 28,
                height: 28,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.6)",
              }}
            >
              {props.chansons.length}
            </Box>
          </Box>
        </Box>

        <CardContent sx={{ padding: 2, paddingTop: 1 }}>
          <Typography
            variant="body1"
            component="div"
            className="vinyl-text-primary"
            sx={{
              fontWeight: 600,
              color: "#F5E6D3",
              marginBottom: 0.5,
              wordWrap: "break-word",
              lineHeight: 1.3,
            }}
          >
            {props.titre}
          </Typography>
          <Typography
            variant="body2"
            className="vinyl-text-secondary"
            sx={{
              color: "#ebd9c0ff",
              wordWrap: "break-word",
              lineHeight: 1.3,
              marginBottom: 1,
            }}
          >
            {props.artiste}
          </Typography>

          {/* Genre tags */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 0.5,
              justifyContent: "center",
            }}
          >
            {props.genres.slice(0, 2).map((genre, index) => (
              <Chip
                key={index}
                label={genre}
                size="small"
                className="vinyl-chip"
                sx={{
                  backgroundColor: CARD_BG,
                  color: "#ebd9c0ff",
                  fontSize: "0.7rem",
                  height: "20px",
                  fontWeight: 500,
                  border: "1px solid rgba(212, 165, 116, 0.4)",
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
      <VinyleDialog
        open={dialogueOuvert}
        onClose={handleClose}
        vinyle={props}
      ></VinyleDialog>
    </>
  );
}

function VinyleDialog({ open, onClose, vinyle }: IVinyleDialogProps) {
    const { isLoggedIn } = useContext(LoginContext);
  if (!vinyle) return null;

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const totalDuration = vinyle.chansons.reduce(
    (acc, chanson) => acc + chanson.duree,
    0
  );

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
              <Typography
                sx={{ color: "#F5E6D3", marginBottom: 2 }}
              ></Typography>

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
                  sx={{
                    backgroundColor: "rgba(14, 180, 218, 0.2)",
                    color: "#F5E6D3",
                    border: `1px solid rgba(54, 68, 160, 0.4)`,
                    fontWeight: "bold",
                    marginRight: "25px"
                  }}
                >
                  Modifier
                </Button>
                <Button
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

export default Vinyle;
