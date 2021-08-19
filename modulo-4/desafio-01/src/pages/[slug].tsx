import { GetStaticPaths, GetStaticProps } from 'next';
import { Box, Container } from '@chakra-ui/react';

import { Header } from '../components/Header';
import { Banner } from '../components/Slug/Banner';
import { ContinentInfo } from '../components/Slug/ContinentInfo';
import { PopularCities } from '../components/Slug/PopularCities';

interface Continent {
  id: string;
  name: string;
  about: string;
  description: string;
  countries: number;
  languages: number;
  banner: string[];
}

interface PopularCitiesData {
  continent: string;
  city: string;
  imgUrl: string;
  country: string;
  countryFlagUrl: string;
}

interface HomeProps {
  continent: Continent;
  popularCities: PopularCitiesData[];
}

export default function Home({ continent, popularCities }: HomeProps) {
  return (
    <Box>
      <Header />
      <Container maxWidth="90rem" p="0 0 2.5rem 0">
        <Banner banner={continent.banner[1]} name={continent.name} />
        <Container
          maxWidth="78.124rem"
          p={{ base: '0 0 1.5rem 0', sm: '0 0 2.5rem 0' }}
        >
          <ContinentInfo
            countries={continent.countries}
            languages={continent.languages}
            about={continent.about}
            popularCities={popularCities.length}
          />
          <PopularCities popularCities={popularCities} />
        </Container>
      </Container>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params;

  const getContinents = await fetch('http://localhost:3333/continents');
  const continents: Continent[] = await getContinents.json();

  const getPopularCities = await fetch('http://localhost:3333/popular-cities');
  const popularCitiesData: PopularCities[] = await getPopularCities.json();

  const continent = continents.find(continent => continent.id === slug);
  const popularCities = popularCitiesData.filter(
    city => city.continent === slug,
  );

  return {
    props: { continent, popularCities },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('http://localhost:3333/continents');
  const continents: Continent[] = await response.json();

  const paths = continents.map(continent => {
    const continentPath = continent.id;
    return { params: { slug: continentPath } };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};
