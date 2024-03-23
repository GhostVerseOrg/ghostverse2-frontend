import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
} from 'urql';

import { getUrlFromEnv } from '@/app/_utils/getUrlFromEnv';
export const cmsUrqlClient = createClient({
  url: getUrlFromEnv().cms,
  exchanges: [dedupExchange, cacheExchange, fetchExchange],
});
