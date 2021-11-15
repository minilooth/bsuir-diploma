import React from 'react';
import {Grid} from "@mui/material";
import {SparePart} from "types/spareparts/sparePart";
import {SparePartListItem} from "components/parts/SparePartList/SparePartListItem";

interface SparePartListContentProps {
  spareParts: SparePart[];
}

export const SparePartListContent: React.FC<SparePartListContentProps> = ({spareParts}) => {
  const empty = !spareParts?.length;
  return (
    <Grid container spacing={2}>
      {empty && (
        <Grid item xs={12} className="d-flex justify-center">
          Не удалось найти запчасти или их список пока пуст! &#128577;
        </Grid>
      )}
      {!empty && spareParts.map((sparePart, index) =>
        <SparePartListItem key={index} sparePart={sparePart}/>
      )}
    </Grid>
  );
};
