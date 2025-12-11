import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import Aurora from "../Aurora";

function Login() {
  const [courriel, setCourriel] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const navigate = useNavigate();
  const { login, isLoggedIn } = useContext(LoginContext);

  async function performLogin() {
    await login(courriel, motDePasse)
      .then((reussi) => {
        if (reussi) {
          setErreur("");
        }
      })
      .catch(() => setErreur("Login incorrecte"));
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performLogin();
  };

  return (
    <Box sx={{ position: "relative", minHeight: "100vh" }}>
      {/* Fullscreen background terminal */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
        }}
      >
        {/* Code de : https://www.reactbits.dev/backgrounds/aurora  */}
        <Aurora
          colorStops={["#ff6c26", "#ff0d00", "#ff00fb"]}
          blend={0.2}
          speed={0.5}
        />
        {/* Fin du code emprunté */}
      </Box>
      <Box
        sx={{
          padding: 2,
          paddingTop: 12,
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Card
          className="login-card"
          sx={{
            maxWidth: 900,
            width: "100%",
            backgroundColor: "rgba(61, 47, 40, 0.6)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(212, 165, 116, 0.3)",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {/* Image Side */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 4,
                backgroundColor: "rgba(212, 165, 116, 0.1)",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  color: "#F5E6D3",
                  fontWeight: "bold",
                  marginBottom: 1,
                  textAlign: "center",
                }}
              >
                Bienvenue sur LA plateforme de vinyle ! 
              </Typography>
            </Box>

            {/* Form Side */}
            <Box
              sx={{
                flex: 1,
                padding: 4,
              }}
            >
              <CardContent>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#F5E6D3",
                    marginBottom: 4,
                    textAlign: "center",
                  }}
                >
                  La connexion permet d'ajouter, modifier et supprimer des vinyles.
                </Typography>

                <form onSubmit={handleSubmit}>
                  {/* Email Field */}
                  <Box sx={{ marginBottom: 3 }}>
                    <Typography
                      sx={{
                        color: "#F5E6D3",
                        fontWeight: "bold",
                        marginBottom: 1,
                      }}
                    >
                      Courriel
                    </Typography>
                    <TextField
                      fullWidth
                      type="email"
                      value={courriel}
                      onChange={(e) => setCourriel(e.target.value)}
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#F5E6D3",
                          backgroundColor: "rgba(0, 0, 0, 0.2)",
                          "& fieldset": {
                            borderColor: "rgba(212, 165, 116, 0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(212, 165, 116, 0.5)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#D4A574",
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Password Field */}
                  <Box sx={{ marginBottom: 3 }}>
                    <Typography
                      sx={{
                        color: "#F5E6D3",
                        fontWeight: "bold",
                        marginBottom: 1,
                      }}
                    >
                      Mot de passe
                    </Typography>
                    <TextField
                      fullWidth
                      type="password"
                      value={motDePasse}
                      onChange={(e) => setMotDePasse(e.target.value)}
                      placeholder="******************"
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#F5E6D3",
                          backgroundColor: "rgba(0, 0, 0, 0.2)",
                          "& fieldset": {
                            borderColor: "rgba(212, 165, 116, 0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(212, 165, 116, 0.5)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#D4A574",
                          },
                        },
                      }}
                    />
                  </Box>

                  {/* Error Message */}
                  {erreur && (
                    <Box sx={{ marginBottom: 3 }}>
                      <Typography
                        sx={{
                          color: "#ff6b6b",
                          textAlign: "center",
                          backgroundColor: "rgba(255, 107, 107, 0.1)",
                          padding: 1.5,
                          borderRadius: 1,
                          border: "1px solid rgba(255, 107, 107, 0.3)",
                        }}
                      >
                        {erreur}
                      </Typography>
                    </Box>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      backgroundColor: "#D4A574",
                      color: "#2A1810",
                      padding: 1.5,
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      borderRadius: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#C4A57B",
                        transform: "translateY(-2px)",
                        boxShadow: "0px 6px 16px rgba(212, 165, 116, 0.4)",
                      },
                    }}
                  >
                    Se connecter
                  </Button>
                </form>
              </CardContent>
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}

export default Login;
