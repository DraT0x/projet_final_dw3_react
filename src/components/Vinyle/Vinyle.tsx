import { Card, Typography, CardContent, Box, Chip } from '@mui/material';
import { memo } from 'react';

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
const CARD_BG = '#ffffff22';
const DISC_BG = '#1a1a1a';

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

function Vinyle(props: IVinyleProps) {
  const handleOnClick = () => {
    props.handleOnClick(props.idVinyle);
  };

  return (
    <Card
      className="vinyl-card"
      sx={{
        backgroundColor: CARD_BG,
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 0, 0, 1)',
        width: 180,
        height: 280,
        borderRadius: 3,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'visible',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.8)',
          backgroundColor: 'rgba(61, 47, 40, 0.6)',
          border: '1px solid rgba(212, 165, 116, 0.5)',
        },
        '&:hover .vinyl-disc': {
          animation: 'spin 2s linear infinite',
          transform: 'translate(-20%, -40%) rotate(0deg)',
          opacity: 1,
        },
        '&:hover .album-cover': {
          transform: 'translateX(-25px)',
        },
        '@keyframes spin': {
          '0%': {
            transform: 'translate(-20%, -40%) rotate(0deg)',
          },
          '100%': {
            transform: 'translate(-20%, -40%) rotate(360deg)',
          },
        },
      }}
      onClick={handleOnClick}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
          paddingBottom: 1,
          position: 'relative',
        }}
      >
        {/* Vinyl disc behind */}
        <Box
          className="vinyl-disc"
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: DISC_SIZE,
            height: DISC_SIZE,
            borderRadius: '50%',
            backgroundColor: DISC_BG,
            boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.6)',
            transition: 'transform 0.5s ease, opacity 0.5s ease',
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
              objectFit: 'cover',
              borderRadius: '50%',
            }}
          />
          
          {/* Vinyl grooves effect */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: DISC_SIZE,
              height: DISC_SIZE,
              borderRadius: '50%',
              background: vinylGroovesGradient,
              pointerEvents: 'none',
            }}
          />
          
          {/* Center hole */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: HOLE_SIZE,
              height: HOLE_SIZE,
              borderRadius: '50%',
              backgroundColor: 'rgba(61, 47, 40, 0.8)',
              backdropFilter: 'blur(5px)',
              border: '3px solid rgba(0, 0, 0, 0.8)',
              boxShadow: 'inset 0px 2px 6px rgba(0, 0, 0, 0.5)',
            }}
          />
        </Box>

        {/* Album cover on top */}
        <Box
          className="album-cover"
          sx={{
            position: 'relative',
            width: COVER_SIZE,
            height: COVER_SIZE,
            borderRadius: 2,
            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.7)',
            overflow: 'visible',
            zIndex: 2,
            transition: 'transform 0.5s ease',
          }}
        >
          <Box
            component="img"
            src={props.urlImage}
            alt={props.titre}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 2,
            }}
          />
          {/* Track count badge */}
          <Box
            className="vinyl-badge"
            sx={{
              position: 'absolute',
              top: -8,
              right: -8,
              backgroundColor: '#f6f1efff',
              color: '#2A1810',
              fontWeight: 'bold',
              fontSize: '0.75rem',
              borderRadius: '50%',
              width: 28,
              height: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.6)',
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
            color: '#F5E6D3',
            marginBottom: 0.5,
            wordWrap: 'break-word',
            lineHeight: 1.3,
          }}
        >
          {props.titre}
        </Typography>
        <Typography
          variant="body2"
          className="vinyl-text-secondary"
          sx={{
            color: '#ebd9c0ff',
            wordWrap: 'break-word',
            lineHeight: 1.3,
            marginBottom: 1,
          }}
        >
          {props.artiste}
        </Typography>
        
        {/* Genre tags */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, justifyContent: 'center' }}>
          {props.genres.slice(0, 2).map((genre, index) => (
            <Chip
              key={index}
              label={genre}
              size="small"
              className="vinyl-chip"
              sx={{
                backgroundColor: CARD_BG,
                color: '#ebd9c0ff',
                fontSize: '0.7rem',
                height: '20px',
                fontWeight: 500,
                border: '1px solid rgba(212, 165, 116, 0.4)',
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

export default memo(Vinyle);