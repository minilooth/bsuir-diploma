import {GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {VehicleActionType, VehicleModel} from "components/parts/settings/VehicleSettings/index";
import {VehicleActionsCell} from "components/parts/settings/VehicleSettings/VehicleActionsCell";

export const makeColumns = (onAction: (id: number | string, type: VehicleActionType, model: VehicleModel, initialValue?: string) => void, model: VehicleModel): GridColDef[] => [
  {
    field: 'id',
    headerName: 'ID',
    flex: 0.1
  },
  {
    field: 'name',
    headerName: 'Марка',
    flex: 0.55,
    renderCell: (params: GridRenderCellParams) => <VehicleActionsCell params={params} onAction={onAction} model={model}/>,
  }
]

export const modelColumns = (onAction: (id: number | string, type: VehicleActionType, model: VehicleModel, initialValue?: string) => void, model: VehicleModel): GridColDef[] => [
  {
    field: 'id',
    headerName: 'ID',
    flex: 0.1
  },
  {
    field: 'name',
    headerName: 'Модель',
    flex: 0.55,
    renderCell: (params: GridRenderCellParams) => <VehicleActionsCell params={params} onAction={onAction} model={model}/>,
  }
]

export const generationColumns = (onAction: (id: number | string, type: VehicleActionType, model: VehicleModel, initialValue?: string) => void, model: VehicleModel): GridColDef[] => [
  {
    field: 'id',
    headerName: 'ID',
    flex: 0.1
  },
  {
    field: 'name',
    headerName: 'Поколение',
    flex: 0.55,
    renderCell: (params: GridRenderCellParams) => <VehicleActionsCell params={params} onAction={onAction} model={model}/>,
  }
]
