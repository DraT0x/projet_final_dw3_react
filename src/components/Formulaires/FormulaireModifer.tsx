import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";

import { Box, Button, TextField, Typography } from "@mui/material";

import BarreNavigation from "../BarreNavigation";
import Aurora from "../Aurora";

// Inspiré de : https://www.webdevtutor.net/blog/typescript-random-hex-string
function generateRandomHexString(length: number): string {
  let resultat = "";
  for (let i = 0; i < length; i++) {
    resultat += Math.floor(Math.random() * 16).toString(16);
  }
  return resultat;
}

const FormulaireModifier = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { vinyle } = location.state || {};

  const { isLoggedIn, token } = useContext(LoginContext);

  const [couleurAurora] = useState<[string, string, string]>(() => [
    `#${generateRandomHexString(6)}`,
    `#${generateRandomHexString(6)}`,
    `#${generateRandomHexString(6)}`,
  ]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  // Pré-remplir TOUS les champs avec les données du vinyle
  const [urlImage, setUrlImage] = useState(vinyle?.urlImage || "");
  const [artiste, setArtiste] = useState(vinyle?.artiste || "");
  const [titre, setTitre] = useState(vinyle?.titre || "");
  const [prixAchat, setPrixAchat] = useState(
    vinyle?.prix_achat?.toString() || ""
  );
  const [dateParution, setDateParution] = useState(
    vinyle?.date_parution ? new Date(vinyle.date_parution) : new Date()
  );
  const [chansons, setChansons] = useState<{ nom: string; duree: number }[]>(
    vinyle?.chansons || []
  );
  const [genres, setGenres] = useState<string[]>(vinyle?.genres || []);
  const [possession, setPossession] = useState(vinyle?.possession || false);

  // États pour l'ajout de nouvelles chansons/genres
  const [nouvelleDuree, setNouvelleDuree] = useState("");
  const [nouvelleChanson, setNouvelleChanson] = useState("");
  const [nouveauGenre, setNouveauGenre] = useState("");

  interface ErreursFormulaire {
    urlImage: string;
    titre: string;
    artiste: string;
    chansons: string;
    dateParution: string;
    genre: string;
  }

  const [erreur, setErreurs] = useState<ErreursFormulaire>({
    urlImage: "",
    titre: "",
    artiste: "",
    chansons: "",
    dateParution: "",
    genre: "",
  });

  // Inspiré de : https://w3htmlschool.com/react-form-validation-and-error-handling-complete-beginners-guide-2025/
  const validationFormulaire = () => {
    let tempErreurs: Partial<ErreursFormulaire> = {}; // Utilisation de Partial pour que ce soit des champs optionnelles

    if (!urlImage) tempErreurs.urlImage = "Url Image est requis";
    if (!titre) tempErreurs.titre = "Titre de l'album est requis";
    if (!artiste) tempErreurs.artiste = "Nom de l'artiste est requis";
    if (!dateParution)
      tempErreurs.dateParution = "La date de parution est requise";
    if (chansons.length == 0)
      tempErreurs.chansons = "Au moins 1 chanson est requise";
    if (genres.length == 0) tempErreurs.genre = "Au moins 1 genre est requis";

    setErreurs(tempErreurs as ErreursFormulaire); // ChatGPT m'a donné cette ligne
    console.log(Object.keys(tempErreurs).length === 0);
    return Object.keys(tempErreurs).length === 0;
  };

  const envoiVinyle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(vinyle)
    if (validationFormulaire()) {
      axios
        .put(
          // Changé de POST à PUT
          `https://vinylesapi-bke0b0evdcdqdwb2.canadacentral-01.azurewebsites.net/api/vinyles/`,
          {
            vinyle: {
              id: vinyle._id,
              urlImage: urlImage,
              titre: titre,
              artiste: artiste,
              chansons: chansons,
              genres: genres,
              date_parution: dateParution,
              prix_achat: parseFloat(prixAchat),
              possession: possession,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          navigate("/");
        })
        .catch((erreur) => {
          console.error("Erreur lors de la modification:", erreur);
          // Optionally show an error message to the user
        });
    }
  };

  const ajouterChanson = () => {
    if (nouvelleChanson.trim() && nouvelleDuree) {
      const dureeEnSecondes = parseInt(nouvelleDuree);
      if (!isNaN(dureeEnSecondes)) {
        setChansons([
          ...chansons,
          { nom: nouvelleChanson.trim(), duree: dureeEnSecondes },
        ]);
        setNouvelleChanson("");
        setNouvelleDuree("");
      }
    }
  };

  const ajouterGenre = () => {
    if (nouveauGenre.trim() === "") return;
    setGenres([...genres, nouveauGenre]);
    setNouveauGenre("");
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
          backgroundColor: "#191919",
        }}
      >
        {/* Code de : https://www.reactbits.dev/backgrounds/aurora  */}
        <Aurora colorStops={couleurAurora} blend={0.2} speed={0.5} />
        {/* Fin du code emprunté */}
      </Box>

      {/* Content on top of background */}
      <Box
        sx={{
          padding: 2,
          paddingTop: 12,
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <BarreNavigation />
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            background: "rgba(255, 255, 255, 0.1)",
            padding: "40px",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          }}
          onSubmit={envoiVinyle}
        >
          {/* TITRE CENTRÉ */}
          <h2
            style={{
              color: "#fff",
              fontSize: "28px",
              textAlign: "center",
            }}
          >
            AJOUTER VINYLE
          </h2>

          {/* URL */}
          <label
            style={{ display: "flex", flexDirection: "column", color: "#fff" }}
          >
            URL du cover de l'album*
            <input
              value={urlImage}
              onChange={(e) => setUrlImage(e.target.value)}
              style={{
                padding: "12px 16px",
                borderRadius: "10px",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                background: "rgba(255, 255, 255, 0.15)",
                color: "#fff",
              }}
            />
            {erreur.urlImage && (
              <p style={{ color: "red" }}>{erreur.urlImage}</p>
            )}
          </label>

          {/* ARTISTE */}
          <label
            style={{ display: "flex", flexDirection: "column", color: "#fff" }}
          >
            Artiste qui a fait l'album*
            <input
              value={artiste}
              onChange={(e) => setArtiste(e.target.value)}
              style={{
                padding: "12px 16px",
                borderRadius: "10px",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                background: "rgba(255, 255, 255, 0.15)",
                color: "#fff",
              }}
            />
            {erreur.artiste && <p style={{ color: "red" }}>{erreur.artiste}</p>}
          </label>

          {/* TITRE*/}
          <label
            style={{ display: "flex", flexDirection: "column", color: "#fff" }}
          >
            Titre de l'album*
            <input
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              style={{
                padding: "12px 16px",
                borderRadius: "10px",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                background: "rgba(255, 255, 255, 0.15)",
                color: "#fff",
              }}
            />
            {erreur.titre && <p style={{ color: "red" }}>{erreur.titre}</p>}
          </label>

          {/* PRIX */}
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#fff",
              textAlign: "center",
            }}
          >
            Prix de l'achat
            <input
              value={prixAchat}
              onChange={(e) => setPrixAchat(e.target.value)}
              style={{
                margin: "0 auto",
                width: "60%",
                padding: "12px 16px",
                borderRadius: "10px",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                background: "rgba(255, 255, 255, 0.15)",
                color: "#fff",
                fontSize: "16px",
              }}
            />
          </label>

          {/* DATE ALBUM*/}
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#fff",
              textAlign: "center",
            }}
          >
            Date de Parution de l'album*
            <TextField
              type="date"
              onChange={(e) => setDateParution(new Date(e.target.value))}
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
                "& .MuiInputLabel-root": {
                  color: "#C4A57B",
                },
              }}
            />
            {erreur.dateParution && (
              <p style={{ color: "red" }}>{erreur.dateParution}</p>
            )}
          </label>

          {/* ZONE GENRES + CHANSONS CÔTE À CÔTE */}
          {/* --- COLONNE CHANSONS --- */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
              <Box sx={{ flex: 1 }}>
                <label
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    color: "#F5E6D3",
                  }}
                >
                  Nom de la chanson*
                  <input
                    value={nouvelleChanson}
                    onChange={(e) => setNouvelleChanson(e.target.value)}
                    placeholder="Titre de la chanson"
                    style={{
                      padding: "12px 16px",
                      borderRadius: "10px",
                      border: "2px solid rgba(212, 165, 116, 0.3)",
                      background: "rgba(0, 0, 0, 0.2)",
                      color: "#F5E6D3",
                    }}
                  />
                </label>
              </Box>

              <Box sx={{ width: 150 }}>
                <label
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    color: "#F5E6D3",
                  }}
                >
                  Durée (secondes)*
                  <input
                    type="number"
                    value={nouvelleDuree}
                    onChange={(e) => setNouvelleDuree(e.target.value)}
                    placeholder="180"
                    style={{
                      padding: "12px 16px",
                      borderRadius: "10px",
                      border: "2px solid rgba(212, 165, 116, 0.3)",
                      background: "rgba(0, 0, 0, 0.2)",
                      color: "#F5E6D3",
                    }}
                  />
                </label>
              </Box>

              <Button
                onClick={ajouterChanson}
                sx={{
                  alignSelf: "flex-end",
                  backgroundColor: "#D4A574",
                  color: "#2A1810",
                  "&:hover": { backgroundColor: "#C4A57B" },
                }}
              >
                +
              </Button>
            </Box>

            {/* Liste des chansons ajoutées */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {chansons.map((chanson, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 1.5,
                    backgroundColor: "rgba(212, 165, 116, 0.15)",
                    borderRadius: 1,
                    border: "1px solid rgba(212, 165, 116, 0.3)",
                  }}
                >
                  <Typography sx={{ color: "#F5E6D3" }}>
                    {index + 1}. {chanson.nom}
                  </Typography>
                  <Typography sx={{ color: "#C4A57B" }}>
                    {Math.floor(chanson.duree / 60)}:
                    {(chanson.duree % 60).toString().padStart(2, "0")}
                  </Typography>
                </Box>
              ))}
            </Box>
            {erreur.chansons && (
              <p style={{ color: "red" }}>{erreur.chansons}</p>
            )}
          </div>

          {/* --- COLONNE GENRES --- */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
              <Box sx={{ flex: 1 }}>
                <label
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    color: "#F5E6D3",
                  }}
                >
                  Nom du genre*
                  <input
                    value={nouveauGenre}
                    onChange={(e) => setNouveauGenre(e.target.value)}
                    placeholder="Nom du genre"
                    style={{
                      padding: "12px 16px",
                      borderRadius: "10px",
                      border: "2px solid rgba(212, 165, 116, 0.3)",
                      background: "rgba(0, 0, 0, 0.2)",
                      color: "#F5E6D3",
                    }}
                  />
                </label>
              </Box>

              <Button
                onClick={ajouterGenre}
                sx={{
                  alignSelf: "flex-end",
                  backgroundColor: "#D4A574",
                  color: "#2A1810",
                  "&:hover": { backgroundColor: "#C4A57B" },
                }}
              >
                +
              </Button>
            </Box>

            {/* Liste des genres ajoutées */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {genres.map((genre, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 1.5,
                    backgroundColor: "rgba(212, 165, 116, 0.15)",
                    borderRadius: 1,
                    border: "1px solid rgba(212, 165, 116, 0.3)",
                  }}
                >
                  <Typography sx={{ color: "#F5E6D3" }}>
                    {index + 1}. {genre}
                  </Typography>
                </Box>
              ))}
            </Box>
            {erreur.genre && <p style={{ color: "red" }}>{erreur.genre}</p>}
          </div>

          {/* Possession */}
          <label
            style={{
              display: "flex",
              alignItems: "center",
              color: "#fff",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <input
              type="checkbox"
              checked={possession}
              onChange={(e) => setPossession(e.target.checked)}
              style={{
                width: "20px",
                height: "20px",
              }}
            />
            Album en votre possession ?
          </label>

          {/* Submit */}
          <button
            type="submit"
            style={{
              padding: "14px 32px",
              borderRadius: "10px",
              border: "none",
              background: "linear-gradient(135deg, #ff6c26, #977296)",
              color: "#000",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            Soumettre le vinyle
          </button>
        </form>
      </Box>
    </Box>
  );
};

export default FormulaireModifier;
