import { useLocation } from '@reach/router';
import * as queryString from 'query-string';

export const useUrlQuery = () => {
  const location = useLocation();
  return queryString.parse(location.search);
};
