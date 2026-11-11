import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink } from "react-router";

function NavBar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Personal Trainer
                </Typography>
                <Button color="inherit" component={NavLink} to="/customers">
                    Customers
                </Button>
                <Button color="inherit" component={NavLink} to="/trainings">
                    Trainings
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;