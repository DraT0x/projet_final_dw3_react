import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../contexts/LoginContext";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { Box } from "@mui/material";

import BarreNavigation from "../BarreNavigation";
import Aurora from "../Aurora";

function FormulaireAjout() {
  // Vérifie si l'utilisateur est connecté
  const navigate = useNavigate();
  const { isLoggedIn, token } = useContext(LoginContext);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  // Formulaire D'Ajout
  const [urlImage, setUrlImage] = useState("");
  const [titre, setTitre] = useState("");
  const [artiste, setArtiste] = useState("");

  const [chansons, setChansons] = useState<{ nom: string; duree: number }[]>(
    []
  );
  const [nouvelleChanson, setNouvelleChanson] = useState("");

  const [genres, setGenres] = useState<string[]>([]);
  const [nouveauGenre, setNouveauGenre] = useState("");

  const [prixAchat, /*setPrixAchat*/] = useState(0);
  const [possession, setPossession] = useState(false);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      axios.post(
        "https://vinylesapi-bke0b0evdcdqdwb2.canadacentral-01.azurewebsites.net/api/vinyles/",
        {
          vinyle: {
            urlImage: urlImage,
            titre: titre,
            artiste: artiste,
            chansons: chansons,
            genres: genres,
            date_parution: "1983-10-13T00:00:00.000Z",
            prix_achat: prixAchat,
            possession: possession,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // .then(() => {

      // });
    }
  }, []);

  const ajouterChanson = () => {
    if (nouvelleChanson.trim() === "") return;
    setChansons([...chansons, { nom: nouvelleChanson, duree: 0 }]);
    setNouvelleChanson("");
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
            URL du cover de l'album
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
          </label>

          {/* ARTISTE SOUS URL */}
          <label
            style={{ display: "flex", flexDirection: "column", color: "#fff" }}
          >
            Artiste qui a fait l'album
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
          </label>

          {/* TITRE CENTRÉ SOUS ARTISTE */}
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#fff",
              textAlign: "center",
            }}
          >
            Titre de l'album
            <input
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
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

          {/* ZONE GENRES + CHANSONS CÔTE À CÔTE */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
              marginTop: "20px",
            }}
          >
            {/* --- COLONNE CHANSONS --- */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <label style={{ display: "flex", flexDirection: "column", color: "#fff" }}>
                Nom de la chanson
                <input
                  value={nouvelleChanson}
                  onChange={(e) => setNouvelleChanson(e.target.value)}
                  style={{
                    padding: "12px 16px",
                    borderRadius: "10px",
                    border: "2px solid rgba(255, 255, 255, 0.3)",
                    background: "rgba(255, 255, 255, 0.15)",
                    color: "#fff",
                  }}
                />
              </label>

              <button
                type="button"
                onClick={ajouterChanson}
                style={{
                  padding: "10px 20px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #ff6c26, #977296)",
                  border: "none",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Ajouter chanson
              </button>

              <ul style={{ color: "white" }}>
                {chansons.map((c, i) => (
                  <li key={i}>{c.nom}</li>
                ))}
              </ul>
            </div>

            {/* --- COLONNE GENRES --- */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <label style={{ display: "flex", flexDirection: "column", color: "#fff" }}>
                Genre
                <input
                  value={nouveauGenre}
                  onChange={(e) => setNouveauGenre(e.target.value)}
                  style={{
                    padding: "12px 16px",
                    borderRadius: "10px",
                    border: "2px solid rgba(255, 255, 255, 0.3)",
                    background: "rgba(255, 255, 255, 0.15)",
                    color: "#fff",
                  }}
                />
              </label>

              <button
                type="button"
                onClick={ajouterGenre}
                style={{
                  padding: "10px 20px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #ff6c26, #977296)",
                  border: "none",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Ajouter genre
              </button>

              <ul style={{ color: "white" }}>
                {genres.map((g, i) => (
                  <li key={i}>{g}</li>
                ))}
              </ul>
            </div>
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
}

export default FormulaireAjout;
