import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { LoginContext } from "../../contexts/LoginContext";

function BarreNavigation() {
  const { isLoggedIn } = useContext(LoginContext);

  return (
    <AppBar
      position="fixed"
      style={{
        top: 0,
        left: 0,
        width: "100%",
        background: "transparent",
        boxShadow: "none",
        zIndex: 9999, // <-- stays above everything
        padding: "10px 0",
      }}
    >
      <Toolbar
        sx={{
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRadius: "40px",
          padding: "12px 24px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          margin: "0 auto",
          width: "90%",
          maxWidth: "1200px",
        }}
      >
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          PROJET FINAL DW3
        </Typography>

        <Button color="inherit" component={Link} to="/">
          Accueil
        </Button>

        {isLoggedIn && (
          <Button color="inherit" component={Link} to="/ajouter">
            Ajout Vinyle
          </Button>
        )}

        <Button color="inherit" component={Link} to="/login">
          {isLoggedIn ? "Connecté !" : "Se Connecter"}
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default BarreNavigation;
