'use client';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';



const { palette } = createTheme();
const theme = createTheme({
    cssVariables: true,
    typography: {
    fontFamily: 'var(--font-montserrat)',
  },  
  palette: {
    info: palette.augmentColor({
        color: {
            main: '#000000',
        },
        
    }),
    warning: palette.augmentColor({
        color: {
            main: red[500],
        },
        
    }), 
}
});



export default theme;