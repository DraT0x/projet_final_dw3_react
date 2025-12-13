import { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import axios from "axios";

import BarreNavigation from "../BarreNavigation";
import Vinyle from "../Vinyle";
import Aurora from "../Aurora";

interface IChanson {
  nom: string;
  duree: number;
}

export interface IVinyleProps {
  _id: string;
  urlImage: string;
  titre: string;
  artiste: string;
  chansons: IChanson[];
  genres: string[];
  date_parution: Date;
  prix_achat: Number;
  possession: boolean;
}

// Inspiré de : https://www.webdevtutor.net/blog/typescript-random-hex-string
function generateRandomHexString(length: number): string {
  let resultat = "";
  for (let i = 0; i < length; i++) {
    resultat += Math.floor(Math.random() * 16).toString(16);
  }
  return resultat;
}

function MenuPrincipal() {
  const [listeVinyles, setListeVinyles] = useState<IVinyleProps[]>([]);

  const [couleurAurora] = useState<[string, string, string]>(() => [
    `#${generateRandomHexString(6)}`,
    `#${generateRandomHexString(6)}`,
    `#${generateRandomHexString(6)}`,
  ]);

  useEffect(() => {
    axios
      .get(
        "https://vinylesapi-bke0b0evdcdqdwb2.canadacentral-01.azurewebsites.net/api/vinyles/"
      )
      .then((response) => {
        setListeVinyles(response.data.vinyles);
      });
  }, []);

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
        <Aurora
          colorStops={couleurAurora}
          blend={0.2}
          speed={0.5}
        />
        {/* Fin du code emprunté */}
      </Box>

      {/* Content on top of background */}
      <Box sx={{ position: "relative", zIndex: 0 }}>
        <BarreNavigation />
        <Grid
          container
          spacing={2}
          sx={{
            padding: 2,
            paddingTop: 12,
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          {listeVinyles &&
            listeVinyles.map((vinyle) => {
              return (
                <Grid key={vinyle._id}>
                  <Vinyle
                    _id={vinyle._id}
                    urlImage={vinyle.urlImage}
                    titre={vinyle.titre}
                    artiste={vinyle.artiste}
                    chansons={vinyle.chansons}
                    genres={vinyle.genres}
                    date_parution={vinyle.date_parution}
                    prix_achat={vinyle.prix_achat}
                    possession={vinyle.possession}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </Box>
  );
}

export default MenuPrincipal;
