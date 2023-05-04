import { Faq } from '@appTypes/faq';
import { ServiceResponse } from '@appTypes/gecros';
import { SanityClient } from '@lib/sanity';

export const getFaqs = ({ filter = '' }: { filter?: string }): Promise<ServiceResponse<Array<Faq>>> => {
  return SanityClient.fetch<Faq[]>(
    `*[_type == "faq" && (title match "*" + $filter + "*" || tags match "*" + $filter + "*" )] | order(title asc)`,
    { filter }
  )
    .then((data) => {
      return { data, message: '' };
    })
    .catch((err) => {
      return { data: null, message: err };
    });
};
