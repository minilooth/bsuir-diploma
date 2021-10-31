import {GridRenderCellParams} from "@mui/x-data-grid";
import {AddressActionsCell} from "components/stores/AddressesDialog/AddressActionsCell";

export const addressColumns = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 0.1
  },
  {
    field: 'full',
    headerName: 'Адрес',
    flex: 0.55,
    renderCell: (params: GridRenderCellParams) => <AddressActionsCell params={params}/>,
  }
]
