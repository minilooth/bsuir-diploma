import React from 'react';
import {DataGrid, GridColDef, GridSelectionModel, ruRU} from "@mui/x-data-grid";

interface TableProps {
  columns: GridColDef[];
  rows: any;
  pageSize?: number;
  rowsPerPageOptions?: number[];
  onSelectionModelChange?: (model: GridSelectionModel) => void;
  selectionModel?: number | number[];
  components?: any;
}

export const Table: React.FC<TableProps> = ({columns, rows, pageSize= 5, rowsPerPageOptions = [5], onSelectionModelChange, selectionModel, components}) => {
  return (
    <DataGrid
      columns={columns}
      rows={rows}
      pageSize={pageSize}
      rowsPerPageOptions={rowsPerPageOptions}
      autoHeight
      onSelectionModelChange={onSelectionModelChange}
      selectionModel={selectionModel}
      hideFooterSelectedRowCount
      components={components}
      localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
    />
  );
};
