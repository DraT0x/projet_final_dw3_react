import { useState, useEffect } from "react";
import { Box } from "@mui/material";

import BarreNavigation from "../BarreNavigation";
import Aurora from "../Aurora";

function FormulaireAjout() {
  const [urlImage, setUrlImage] = useState("");
  const [titre, setTitre] = useState("");
  const [artiste, setArtiste] = useState("");
  const [prixAchat, setPrixAchat] = useState(0);
  const [possession, setPossession] = useState(false);

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
            gap: "12px",
            background: "rgba(255, 255, 255, 0.1)",
            padding: "40px",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2
            style={{
              color: "#fff",
              fontSize: "28px",
            }}
          >
            AJOUTER VINYLE
          </h2>

          <label
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#fff",
            }}
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
                fontSize: "16px",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#26ff00")}
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(255, 255, 255, 0.3)")
              }
            />
          </label>

          <label
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#fff",
              fontWeight: "500",
              gap: "8px",
            }}
          >
            Titre de l'album
            <input
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              style={{
                padding: "12px 16px",
                borderRadius: "10px",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                background: "rgba(255, 255, 255, 0.15)",
                color: "#fff",
                fontSize: "16px",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#eeff00")}
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(255, 255, 255, 0.3)")
              }
            />
          </label>

          <label
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#fff",
              fontWeight: "500",
              gap: "8px",
            }}
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
                fontSize: "16px",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#ff6c26")}
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(255, 255, 255, 0.3)")
              }
            />
          </label>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              color: "#fff",
              fontWeight: "500",
              gap: "12px",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              name="possessionCheckbox"
              style={{
                width: "20px",
                height: "20px",
                cursor: "pointer",
                accentColor: "#26ff00",
              }}
            />
            Album en votre possession ?
          </label>

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
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(224, 147, 59, 0.3)",
              marginTop: "10px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(252, 183, 104, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 15px rgba(224, 147, 59, 0.3)";
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
