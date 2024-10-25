import { Avatar, IconButton } from "@mui/material";
import { AutorenewRounded } from "@mui/icons-material";
import { red } from '@mui/material/colors';


export default function ResetButton(props: {
    onClick: () => void;
    
  }) {
    return (
      
      <IconButton
        onClick={props.onClick} 
        color="warning"
      >
        <Avatar sx={{ bgcolor: red[500]}}>
            <AutorenewRounded fontSize="inherit"/>
        </Avatar>
        
      </IconButton>
      
    );
  }