import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import axios from "axios";

import BarreNavigation from "../BarreNavigation";
import Vinyle from "../Vinyle";
import Aurora from "../Aurora";

interface IChanson {
  nom: string;
  duree: number;
}

interface IVinyle {
  idVinyle: string;
  urlImage: string;
  titre: string;
  artiste: string;
  chansons: IChanson[];
  genres: string[];
  dateParution: Date;
  possession: boolean;
}

function MenuPrincipal() {
  const [listeVinyles, setListeVinyles] = useState<IVinyle[]>([]);

  useEffect(() => {
    axios.get("https://vinylesapi-bke0b0evdcdqdwb2.canadacentral-01.azurewebsites.net/api/vinyles/").then((response) => {
      setListeVinyles(response.data.vinyles);
      console.log(response.data.vinyles);
    });
  }, []);

  const gererClic = (idVinyle: string) => {
    console.log("Clicked on vinyl:", idVinyle);
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
          colorStops={["#26ff00", "#eeff00", "#ff6c26"]}
          blend={0.2}
          speed={0.5}
        />
        {/* Fin du code emprunté */}
      </Box>

      {/* Content on top of background */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <BarreNavigation />
        <Grid
          container
          spacing={2}
          sx={{ padding: 2, paddingTop: 28, justifyContent: "center" }}
        >
          {listeVinyles &&
            listeVinyles.map((vinyle) => {
              return (
                <Grid key={vinyle.idVinyle}>
                  <Vinyle
                    idVinyle={vinyle.idVinyle}
                    urlImage={vinyle.urlImage}
                    titre={vinyle.titre}
                    artiste={vinyle.artiste}
                    chansons={vinyle.chansons}
                    genres={vinyle.genres}
                    dateParution={vinyle.dateParution}
                    possession={vinyle.possession}
                    handleOnClick={gererClic}
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
