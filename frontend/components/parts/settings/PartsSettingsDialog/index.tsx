import React from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs, Typography
} from "@mui/material";
import {TabPanel} from "components/common/TabPanel";
import {CloseOutlined, Settings} from "@mui/icons-material";
import {VehicleSettings} from "components/parts/settings/VehicleSettings";
import {useTypedDispatch} from "redux/hooks";
import {setModels, setGenerations } from 'redux/slices/vehiclesSlice';
import {CatalogSettings} from "components/parts/settings/CatalogSettings";
import {setGroups, setSubcategories } from 'redux/slices/catalogsSlice';
import {MAMSettings} from "components/parts/settings/MAMSettings";

interface PartsSettingsDialog {
  open: boolean;
  onClose: () => void;
}

export enum PartsSettingsItem {
  VEHICLES,
  CATALOG,
  MODIFICATIONS_AND_MANUFACTURERS
}

export const PartsSettingsDialog: React.FC<PartsSettingsDialog> = ({open, onClose}) => {
  const [tabIndex, setTabIndex] = React.useState(PartsSettingsItem.VEHICLES);

  const dispatch = useTypedDispatch();

  const handleChange = (event: React.SyntheticEvent, value: PartsSettingsItem) => {
    if (tabIndex !== value) {
      switch (tabIndex) {
        case PartsSettingsItem.VEHICLES:
          dispatch(setModels([]));
          dispatch(setGenerations([]));
          break;
        case PartsSettingsItem.CATALOG:
          dispatch(setSubcategories([]));
          dispatch(setGroups([]));
          break;
      }
    }
    setTabIndex(value);
  }

  const onDialogClose = () => {
    onClose();
    setTimeout(() => {
      dispatch(setModels([]));
      dispatch(setGenerations([]));
      dispatch(setSubcategories([]));
      dispatch(setGroups([]));
    }, 200)
  }

  return (
    <Dialog
      maxWidth={"lg"}
      fullWidth
      open={open}
      onClose={onDialogClose}
      closeAfterTransition
    >
      <DialogTitle className="d-flex justify-between align-center">
        <Typography variant="h4" className="d-flex align-center">
          <Settings fontSize="inherit" className="mr-10"/>Настройки запчастей
        </Typography>
        <CloseOutlined className="cu-p" onClick={onDialogClose}/>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabIndex} onChange={handleChange}>
              <Tab label="Автомобили"/>
              <Tab label="Каталог"/>
              <Tab label="Модификации и производители"/>
            </Tabs>
          </Box>
          <TabPanel value={tabIndex} index={PartsSettingsItem.VEHICLES}>
            <VehicleSettings/>
          </TabPanel>
          <TabPanel value={tabIndex} index={PartsSettingsItem.CATALOG}>
            <CatalogSettings/>
          </TabPanel>
          <TabPanel value={tabIndex} index={PartsSettingsItem.MODIFICATIONS_AND_MANUFACTURERS}>
            <MAMSettings/>
          </TabPanel>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
