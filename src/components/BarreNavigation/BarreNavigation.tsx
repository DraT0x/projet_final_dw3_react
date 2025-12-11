import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { LoginContext } from "../../contexts/LoginContext";

// Inspiré de : https://www.geeksforgeeks.org/reactjs/link-component-in-react-router/
function BarreNavigation() {
  const { isLoggedIn } = useContext(LoginContext);
  return (
    <AppBar style={{ background: "transparent", boxShadow: "none" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          PROJET FINAL DW3
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Accueil
        </Button>
        <Button color="inherit" component={Link} to="/ajouter">
          Ajout Vinyle
        </Button>
        <Button color="inherit" component={Link} to="/login">
          {isLoggedIn && "Connecté !"}
          {!isLoggedIn && "Se Connecter"}
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default BarreNavigation;
