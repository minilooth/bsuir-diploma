import React from 'react';
import {NextPage} from "next";

import {MainContainer} from "components/common/MainContainer";
import {AuthenticatedLayout} from "components/layouts/AuthenticatedLayout";
import {withAuthServerSideProps} from "core/auth/withAuthServerSideProps";
import {Paper} from "@mui/material";
import {wrapper} from "redux/store";
import {getMakes} from "redux/slices/vehiclesSlice";
import {getCategories} from "redux/slices/catalogsSlice";
import {getManufacturers} from "redux/slices/manufacturersSlice";
import {getModifications} from "redux/slices/modificationsSlice";
import {getSpareParts, selectPages, selectSpareParts} from "redux/slices/sparePartsSlice";
import {useTypedSelector} from "redux/hooks";
import {Manufacturer} from "types/spareparts/manufacturer";
import {Make} from "types/spareparts/vehicle/make";
import {Model} from "types/spareparts/vehicle/model";
import {Generation} from "types/spareparts/vehicle/generation";
import {Category} from "types/spareparts/catalog/category";
import {Subcategory} from "types/spareparts/catalog/subcategory";
import {Group} from "types/spareparts/catalog/group";
import {ManufacturerService} from "service/spareparts/manufacturer/ManufacturerService";
import {MakeService} from "service/spareparts/vehicle/MakeService";
import {ModelService} from "service/spareparts/vehicle/ModelService";
import {GenerationService} from "service/spareparts/vehicle/GenerationService";
import {CategoryService} from "service/spareparts/catalog/CategoryService";
import {SubcategoryService} from "service/spareparts/catalog/SubcategoryService";
import {GroupService} from "service/spareparts/catalog/GroupService";
import {SparePartListHeader} from "components/parts/list/SparePartListHeader";
import {SparePartListContent} from "components/parts/list/SparePartListContent";
import {Paginator} from "components/common/Paginatior";
import {RoleEnum} from "types/user";

interface HomePageProps {
  manufacturer: Manufacturer | null,
  make: Make | null,
  model: Model | null,
  generation: Generation | null,
  category: Category | null,
  subcategory: Subcategory | null,
  group: Group | null,
}

const Home: NextPage<HomePageProps> = (filter) => {
  const spareParts = useTypedSelector(selectSpareParts);
  const pages = useTypedSelector(selectPages);

  return (
    <AuthenticatedLayout title={'Main'}>
      <MainContainer>
        <Paper className="p-20 mt-40 mb-40">
          <SparePartListHeader {...filter}/>
          <SparePartListContent spareParts={spareParts}/>
          <Paginator pages={pages} className={"mt-20"}/>
        </Paper>
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
  await store.dispatch(getSpareParts({query, headers}));

  const {manufacturerId, makeId, modelId, generationId, categoryId, subcategoryId, groupId} = query;

  let manufacturer = null;
  let make = null;
  let model = null;
  let generation = null;
  let category = null;
  let subcategory = null;
  let group = null;

  if (manufacturerId) {
    manufacturer = await ManufacturerService.getById(manufacturerId as string, headers);
  }
  if (makeId) {
    make = await MakeService.getById(makeId as string, headers);
  }
  if (modelId) {
    model = await ModelService.getById(modelId as string, headers);
  }
  if (generationId) {
    generation = await GenerationService.getById(generationId as string, headers);
  }
  if (categoryId) {
    category = await CategoryService.getById(categoryId as string, headers);
  }
  if (subcategoryId) {
    subcategory = await SubcategoryService.getById(subcategoryId as string, headers);
  }
  if (groupId) {
    group = await GroupService.getById(groupId as string, headers);
  }

  return {
    props: {
      manufacturer,
      make,
      model,
      generation,
      category,
      subcategory,
      group
    }
  }
}, {
  authorizationNeeded: true,
  authorities: [RoleEnum.ADMIN, RoleEnum.EMPLOYEE]
}, store))

export default Home;
