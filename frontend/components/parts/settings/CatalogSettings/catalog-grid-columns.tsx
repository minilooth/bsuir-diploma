import {GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {CatalogActionType, CatalogModel} from "components/parts/settings/CatalogSettings/index";
import {CatalogActionsCell} from "components/parts/settings/CatalogSettings/CatalogActionsCell";

export const categoryColumns = (onAction: (id: number | string, type: CatalogActionType, model: CatalogModel, initialValue?: string) => void, model: CatalogModel): GridColDef[] => [
  {
    field: 'id',
    headerName: 'ID',
    flex: 0.1
  },
  {
    field: 'name',
    headerName: 'Категория',
    flex: 0.55,
    renderCell: (params: GridRenderCellParams) => <CatalogActionsCell params={params} onAction={onAction} model={model}/>,
  }
]

export const subcategoryColumns = (onAction: (id: number | string, type: CatalogActionType, model: CatalogModel, initialValue?: string) => void, model: CatalogModel): GridColDef[] => [
  {
    field: 'id',
    headerName: 'ID',
    flex: 0.1
  },
  {
    field: 'name',
    headerName: 'Подкатегория',
    flex: 0.55,
    renderCell: (params: GridRenderCellParams) => <CatalogActionsCell params={params} onAction={onAction} model={model}/>,
  }
]

export const groupColumns = (onAction: (id: number | string, type: CatalogActionType, model: CatalogModel, initialValue?: string) => void, model: CatalogModel): GridColDef[] => [
  {
    field: 'id',
    headerName: 'ID',
    flex: 0.1
  },
  {
    field: 'name',
    headerName: 'Группа',
    flex: 0.55,
    renderCell: (params: GridRenderCellParams) => <CatalogActionsCell params={params} onAction={onAction} model={model}/>,
  }
]
