import React from 'react';
import {useRouter} from "next/router";
import {QueryUtils} from "utils/QueryUtils";

export const useQuery = () => {
  const router = useRouter();
  const {query, pathname} = router;
  const [pushQuery, setPushQuery] = React.useState(query);

  const appendToQuery = (items: object | object[]) => {
    setPushQuery((prev) => QueryUtils.appendKeys(prev, items));
  }

  const deleteFromQuery = (keys: string | string[]) => {
    setPushQuery((prev) => QueryUtils.removeKeys(prev, keys))
  }

  const push = async () => {
    const url = QueryUtils.buildQueriedUrl(pathname, pushQuery);
    await router.push(url);
  }

  return {
    values: query,
    appendToQuery,
    deleteFromQuery,
    push
  }
};
