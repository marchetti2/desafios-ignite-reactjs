import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useCallback } from 'react';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface Data {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface fetchDataResponse {
  after: string | null;
  data: Array<Data>;
}

export default function Home(): JSX.Element {
  const fetchData = async ({
    pageParam = null,
  }): Promise<fetchDataResponse> => {
    const { data } = await api.get<fetchDataResponse>('/api/images', {
      params: {
        after: pageParam,
      },
    });
    return data;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchData, {
    getNextPageParam: (lastPage, _) => {
      return lastPage.after;
    },
  });

  const formattedData = useMemo(() => {
    const arrayData = data?.pages.flatMap(page => page.data);
    return arrayData;
  }, [data]);

  const render = useCallback(() => {
    if (isLoading) {
      return <Loading />;
    }
    if (isError) {
      return <Error />;
    }
    return (
      <>
        <Header />

        <Box maxW={1120} px={20} mx="auto" my={20}>
          <CardList cards={formattedData} />
          {hasNextPage ? (
            <Button onClick={() => fetchNextPage()}>
              {isFetchingNextPage ? 'Caregando...' : 'Carregar mais'}
            </Button>
          ) : null}
        </Box>
      </>
    );
  }, [
    fetchNextPage,
    formattedData,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isLoading,
  ]);

  return render();
}
