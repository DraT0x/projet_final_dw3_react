import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function BarreNavigation() {
    return (
        <AppBar style={{ background: 'transparent', boxShadow: 'none'}}>
            <Toolbar>
                <Typography variant="h6"
                    component="div" sx={{ flexGrow: 1 }}>
                    Projet Final DW3
                </Typography>
                <Button color="inherit">Accueil</Button>
                <Button color="inherit">Ajout Vinyle</Button>
            </Toolbar>
        </AppBar>
    );
}

export default BarreNavigation