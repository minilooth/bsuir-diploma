import React from 'react';
import {NextPage} from "next";

import {MainContainer} from "components/common/MainContainer";
import {AuthenticatedLayout} from "components/layouts/AuthenticatedLayout";
import {withAuthServerSideProps} from "core/auth/withAuthServerSideProps";
import {Button,} from "@mui/material";
import {PartsSettingsDialog} from "components/parts/settings/PartsSettingsDialog";
import {wrapper} from "redux/store";
import {getMakes} from "redux/slices/vehiclesSlice";
import {getCategories} from "redux/slices/catalogsSlice";
import {getManufacturers} from "redux/slices/manufacturersSlice";
import {getModifications} from "redux/slices/modificationsSlice";

const Home: NextPage = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const toggleDialog = () => {
    setDialogOpen((prev) => !prev);
  }

  return (
    <AuthenticatedLayout title={'Main'}>
      <MainContainer>
        <Button onClick={toggleDialog}>OPEN</Button>
        <PartsSettingsDialog open={dialogOpen} onClose={toggleDialog}/>
      </MainContainer>
    </AuthenticatedLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => withAuthServerSideProps(async ({req, res, query}) => {
  const {headers} = req;
  await store.dispatch(getMakes(headers));
  await store.dispatch(getCategories(headers));
  await store.dispatch(getManufacturers(headers));
  await store.dispatch(getModifications(headers));
  return {
    props: {}
  }
}, {
  authorizationNeeded: true
}, store))

export default Home;
