import { createClient } from 'next-sanity';
import { SANITY_API_PROJECT_ID, SANITY_DATASET_NAME } from './constants';

export const SanityClient = createClient({
  projectId: SANITY_API_PROJECT_ID,
  dataset: SANITY_DATASET_NAME,
  apiVersion: 'v2021-10-21',
  useCdn: true,
});
