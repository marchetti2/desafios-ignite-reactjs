import { Box, Container } from '@chakra-ui/react';

import { Header } from '../components/Header';
import { DividerComponent } from '../components/Divider';
import { TravelTypes } from '../components/Index/TravelTypes';
import { Banner } from '../components/Index/Banner';
import { Swiper } from '../components/Index/Swiper';

interface Continent {
  id: string;
  name: string;
  about: string;
  description: string;
  countries: number;
  languages: number;
  banner: string[];
}

interface HomeProps {
  continents: Array<Continent>;
}

export default function Home({ continents }: HomeProps) {
  return (
    <Box>
      <Header />
      <Container
        maxWidth="90rem"
        p={{ base: '0 0 1.5rem 0', sm: '0 0 2.5rem 0' }}
      >
        <Banner />
        <TravelTypes />
        <DividerComponent />
        <Swiper continents={continents} />
      </Container>
    </Box>
  );
}

export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/continents');
  const continents: HomeProps = await response.json();

  return {
    props: { continents },
  };
}
