import React from 'react';
import {Paginator} from "components/common/Paginatior";
import {Paper} from "@mui/material";
import {SparePart} from "types/spareparts/sparePart";
import {SparePartListHeader} from "components/parts/SparePartList/SparePartListHeader";
import {SparePartListContent} from "components/parts/SparePartList/SparePartListContent";

interface SparePartListProps {
  spareParts: SparePart[];
  pages: number;
}

export const SparePartList: React.FC<SparePartListProps> = ({spareParts, pages}) => {
  return (
    <Paper className="p-20 mt-40 mb-40">
      <SparePartListHeader/>
      <SparePartListContent spareParts={spareParts}/>
      <Paginator pages={pages} className={"mt-20"}/>
    </Paper>
  );
};
