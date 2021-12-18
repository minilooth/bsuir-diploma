import {ParsedUrlQuery} from "querystring";
import {SortDirection} from "types/common/sort-direction";
import * as _ from "lodash";

export class QueryUtils {
  static getQueryValue(query: ParsedUrlQuery, key: string): string | string[] | undefined {
    return query[key];
  }

  static removeKeys(query: ParsedUrlQuery, keys: string | string[]): ParsedUrlQuery {
    if (Array.isArray(keys)) {
      keys.forEach(k => {
        query = _.omit(query, k);
      });
    }
    else {
      query = _.omit(query, keys);
    }
    return query;
  }

  static appendKeys(query: ParsedUrlQuery, keys: object | object[]) {
    if (Array.isArray(keys)) {
      keys.forEach(k => {
        Object.entries(k).forEach(([key, value]) => {
          query[key] = value;
        })
      })
    }
    else {
      Object.entries(keys).forEach(([key, value]) => {
        query[key] = value;
      })
    }
    return query;
  }

  static buildQueriedUrl(url: string, query: ParsedUrlQuery) {
    return {
      pathname: url,
      query
    }
  }

  static getSortDirectionFromQuery(query: ParsedUrlQuery, key: string): SortDirection | null {
    const direction = this.getQueryValue(query, key);
    if (direction && !Array.isArray(direction)) {
      return SortDirection[direction.toUpperCase() as keyof typeof SortDirection];
    }
    return null;
  }
}
