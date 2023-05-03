import { Novedad } from '@appTypes/novedad';
import { InputChangeHandler } from '@appTypes/reactCommon';
import SearchInput from '@components/Base/SearchInput';
import SkeletonList from '@components/Base/SkeletonList';
import useInfiniteNovedades from 'hooks/novedades/useInfiniteNovedades';
import { useDebounce } from 'hooks/useDebounce';
import { useEffect, useState } from 'react';
import NovedadCard from './Card';
import NovedadCardSkeleton from './CardSkeleton';

const DEFAULT_NOVEDADES_PAGE_SIZE = 8;
const DEBOUNCE_SEARCH_TIME = 300;

const buildNovedadesCard = (novedad: Novedad) => <NovedadCard key={novedad._id} novedad={novedad} />;

const useInfiniteNovedadesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch: InputChangeHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_SEARCH_TIME);

  const { novedades, refetch, error, isLoading, remove, ref } = useInfiniteNovedades({
    pageSize: DEFAULT_NOVEDADES_PAGE_SIZE,
    queryFilter: debouncedSearchTerm,
  });

  useEffect(() => {
    remove();
    refetch();
  }, [debouncedSearchTerm, refetch, remove]);

  return { novedades, error, isLoading, ref, handleSearch };
};

const InfiniteList = () => {
  const { novedades, error, isLoading, ref, handleSearch } = useInfiniteNovedadesList();

  if (error) {
    return <>Hubo un error cargando las novedades</>;
  }

  return (
    <>
      <div className=" osap-container pb-5 ">
        <SearchInput onChange={handleSearch} />
      </div>
      <div className=" osap-container grid justify-evenly gap-11 auto-fit-fixed-[380px] xl:justify-between">
        {novedades.pages &&
          novedades.pages.map((novedadesPage) => {
            return novedadesPage.page.map(buildNovedadesCard);
          })}
        <SkeletonList show={isLoading} length={8} component={<NovedadCardSkeleton />} />
      </div>
      <div className="h-10" ref={ref} />
    </>
  );
};
export default InfiniteList;
