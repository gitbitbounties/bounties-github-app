import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import orange from '@material-ui/core/colors/orange';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: orange,
        secondary: {
            main: '#ff9800',
        },
    },
});

export default function FloatingActionButtons() {
    return (
        <MuiThemeProvider theme={theme}>
            <div className="fab">
                <Fab color="secondary" aria-label="Add" size="medium" >
                    <AddIcon />
                </Fab>
            </div>
        </MuiThemeProvider>
    );
}
