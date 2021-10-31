import React from 'react';
import {Store} from "types/stores/store";
import {Grid} from "@mui/material";
import {StoreListItem} from "components/stores/StoreList/StoreListItem";

interface StoreListContentProps {
  stores: Store[];
}

export const StoreListContent: React.FC<StoreListContentProps> = ({stores}) => {
  const empty = !stores?.length;
  return (
    <Grid container spacing={2}>
      {empty && (
        <Grid item xs={12} className="d-flex justify-center">
          Не удалось найти магазины/склады или их список пока пуст! &#128577;
        </Grid>
      )}
      {!empty && stores.map((store, index) =>
        <StoreListItem key={index} store={store}/>
      )}
    </Grid>
  );
};
