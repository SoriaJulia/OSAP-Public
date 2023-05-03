import { getPaginatedNovedades } from '@services/novedades';
import { QueryFunctionContext, QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export const GET_NOVEDADES_QUERY_KEY = 'novedades';

const useInfiniteNovedades = ({ pageSize, queryFilter }: { pageSize: number; queryFilter?: string }) => {
  const { ref, inView } = useInView({ threshold: 1 });
  const { data, isFetchingNextPage, isFetching, fetchNextPage, hasNextPage, refetch, error, remove } = useInfiniteQuery(
    [GET_NOVEDADES_QUERY_KEY],
    async (context: QueryFunctionContext<QueryKey, { lastPublishedAt: string; lastId: string }>) => {
      if (!context) {
        return { page: [], hasNextPage: false };
      }
      const { lastPublishedAt, lastId } = context.pageParam || {};
      const result = await getPaginatedNovedades({
        lastPublishedAt,
        lastId,
        pageSize,
        filterTitle: queryFilter,
      });
      return result;
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.hasNextPage) {
          return {
            lastPublishedAt: lastPage.page[lastPage.page.length - 1].fechaPublicacion,
            lastId: lastPage.page[lastPage.page.length - 1]._id,
          };
        }
      },
    }
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  return {
    novedades: data || { pages: [], pageParams: [] },
    isLoading: isFetching,
    isFetchingNextPage,
    error,
    hasNextPage,
    fetchNextPage,
    refetch,
    remove,
    ref,
  };
};

export default useInfiniteNovedades;
