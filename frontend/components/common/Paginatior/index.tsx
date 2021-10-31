import React from 'react';
import {Box, Pagination} from "@mui/material";
import {useRouter} from "next/router";
import {QueryUtils} from "utils/QueryUtils";
import clsx from "clsx";

interface PaginatorProps {
  pages: number;
  className?: string;
}

export const Paginator: React.FC<PaginatorProps> = ({pages, className}) => {
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
    <Box className={clsx("d-flex justify-center", className)}>
      <Pagination count={pages} shape="rounded" onChange={onPaginationChange} page={Number(page)}/>
    </Box>
  );
};
