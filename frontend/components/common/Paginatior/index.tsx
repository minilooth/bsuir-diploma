import React from 'react';
import {Box, Pagination} from "@mui/material";
import {useRouter} from "next/router";
import {QueryUtils} from "utils/QueryUtils";

interface PaginatorProps {
  pages: number;
}

export const Paginator: React.FC<PaginatorProps> = ({pages}) => {
  const router = useRouter();
  const {query, pathname} = router;

  const page = QueryUtils.getQueryValue(query, 'page') ?? 1;

  const onPaginationChange = async (event: React.ChangeEvent<unknown>, page: number) => {
    const pushQuery = {
      ...query,
      page: page.toString()
    }
    const url = QueryUtils.buildQueriedUrl(pathname, pushQuery);
    await router.push(url);
  }

  return (
    <Box className="d-flex justify-center mt-20">
      <Pagination count={pages} shape="rounded" onChange={onPaginationChange} page={Number(page)}/>
    </Box>
  );
};
