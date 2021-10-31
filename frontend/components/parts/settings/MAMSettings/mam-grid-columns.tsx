import {GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {MAMActionType, MAMModel} from "components/parts/settings/MAMSettings/index";
import {MAMActionsCell} from "components/parts/settings/MAMSettings/MAMActionsCell";

export const modificationColumns = (onAction: (id: number | string, type: MAMActionType, model: MAMModel, initialValue?: string) => void, model: MAMModel): GridColDef[] => [
  {
    field: 'id',
    headerName: 'ID',
    flex: 0.1
  },
  {
    field: 'name',
    headerName: 'Модификация',
    flex: 0.55,
    renderCell: (params: GridRenderCellParams) => <MAMActionsCell params={params} onAction={onAction} model={model}/>,
  }
]

export const manufacturerColumns = (onAction: (id: number | string, type: MAMActionType, model: MAMModel, initialValue?: string) => void, model: MAMModel): GridColDef[] => [
  {
    field: 'id',
    headerName: 'ID',
    flex: 0.1
  },
  {
    field: 'name',
    headerName: 'Производитель',
    flex: 0.55,
    renderCell: (params: GridRenderCellParams) => <MAMActionsCell params={params} onAction={onAction} model={model}/>,
  }
]
