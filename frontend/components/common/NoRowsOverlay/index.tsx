import React from 'react';
import {Box, Typography} from "@mui/material";
import {GridOverlay} from "@mui/x-data-grid";

interface NoRowsOverlayProps {
  text: string;
}

export const NoRowsOverlay: React.FC<NoRowsOverlayProps> = ({text}) => {
  return (
    <GridOverlay>
      <Box>
        <Typography variant="body1" align={"center"}>{text}</Typography>
      </Box>
    </GridOverlay>
  )
};
