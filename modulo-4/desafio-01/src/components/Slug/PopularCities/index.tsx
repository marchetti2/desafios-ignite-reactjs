import { Box, Grid, Text } from '@chakra-ui/react';

import { Card } from './Card';

interface PopularCities {
  continent: string;
  city: string;
  imgUrl: string;
  country: string;
  countryFlagUrl: string;
}

interface PopularCitiesProps {
  popularCities: PopularCities[];
}

function PopularCities({ popularCities }: PopularCitiesProps): JSX.Element {
  return (
    <Box px={{ base: '1.5rem', md: '2.812rem' }}>
      <Text
        variant="regular-36px-dark.400"
        mb={{ base: '1.25rem', sm: '2.5rem' }}
      >
        Cidades +100
      </Text>
      <Grid
        templateColumns="repeat(auto-fit, 16rem)"
        gap={{ base: '1.25rem', sm: '1.9rem', md: '2.812rem' }}
        alignItems="center"
        justifyContent="center"
      >
        {popularCities.map(card => (
          <Card
            key={card.city}
            city={card.city}
            imgUrl={card.imgUrl}
            country={card.country}
            flag={card.countryFlagUrl}
          />
        ))}
      </Grid>
    </Box>
  );
}

export { PopularCities };
