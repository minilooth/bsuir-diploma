import React from 'react';
import {Store} from "types/stores/store";
import {Paper} from "@mui/material";
import {Paginator} from "components/common/Paginatior";
import {StoreListHeader} from "components/stores/StoreList/StoreListHeader";
import {StoreListContent} from "components/stores/StoreList/StoreListContent";

interface StoreListProps {
  stores: Store[];
  pages: number;
}

export const StoreList: React.FC<StoreListProps> = ({stores, pages}) => {
  return (
    <Paper className="p-20 mt-40 mb-40">
      <StoreListHeader/>
      <StoreListContent stores={stores}/>
      <Paginator pages={pages} className={"mt-20"}/>
    </Paper>
  );
};
