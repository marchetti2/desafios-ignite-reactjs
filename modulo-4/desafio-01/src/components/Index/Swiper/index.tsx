import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Grid,
  Center,
  VStack,
  Heading,
  Text,
  Box,
  HStack,
  Image,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

interface Continent {
  id: string;
  name: string;
  description: string;
  banner: string[];
}

interface SwiperProps {
  continents: Array<Continent>;
}

function Swiper({ continents }: SwiperProps): JSX.Element {
  const [index, setIndex] = useState(0);

  const router = useRouter();

  function handleSlide(side: string) {
    if (side === 'right') {
      if (index === continents.length - 1) {
        return;
      }
      setIndex(index => index + 1);
    }
    if (side === 'left') {
      if (index === 0) {
        return;
      }
      setIndex(index => index - 1);
    }
  }

  function handleNavigation() {
    const continentRouteParams = continents[index].id;
    return router.push(continentRouteParams);
  }

  return (
    <>
      <Heading
        textAlign="center"
        color="dark.400"
        m={{ base: '1.5rem 0', sm: '3.25rem 0' }}
      >
        Vamos nessa?
        <br />
        Então escolha seu continente
      </Heading>
      <Center>
        <Image
          w={{ base: '23.44rem', sm: '77.5rem' }}
          h={{ base: '15.63rem', sm: '28.12rem' }}
          position="absolute"
          zIndex="-1"
          src={continents[index].banner[0]}
          alt={continents[index].name}
        />
        <Grid
          w={{ base: '23.44rem', sm: '77.5rem' }}
          h={{ base: '15.63rem', sm: '28.12rem' }}
          gridTemplateColumns={{
            base: '2rem 1fr 2rem',
            sm: '5rem 1fr 5rem',
          }}
          gridTemplateRows={{
            base: '1.56rem 1fr 1.56rem',
            sm: '2.812rem 1fr 2.812rem',
          }}
          gridTemplateAreas="'. top .' 'left center right' '. botton .'"
          p={{ base: '0 .75rem', sm: '0 1.25rem' }}
        >
          <Center cursor="pointer" gridArea="center" onClick={handleNavigation}>
            <VStack>
              <Heading variant="bold-48px" textAlign="center">
                {continents[index].name}
              </Heading>
              <Text variant="bold-24px-light.300" textAlign="center">
                {continents[index].description}
              </Text>
            </VStack>
          </Center>
          <Center gridArea="left">
            {index !== 0 ? (
              <Box as="button" onClick={() => handleSlide('left')}>
                <ChevronLeftIcon
                  w={{ base: '2rem', sm: '3.75rem' }}
                  h={{ base: '2rem', sm: '3.75rem' }}
                  color="#FFBA08"
                />
              </Box>
            ) : (
              <Box
                as="button"
                onClick={() => handleSlide('left')}
                disabled
                cursor="not-allowed"
              >
                <ChevronLeftIcon
                  w={{ base: '2rem', sm: '3.75rem' }}
                  h={{ base: '2rem', sm: '3.75rem' }}
                  color="#999999"
                />
              </Box>
            )}
          </Center>
          <Center gridArea="right">
            {index !== continents.length - 1 ? (
              <Box as="button" onClick={() => handleSlide('right')}>
                <ChevronRightIcon
                  w={{ base: '2rem', sm: '3.75rem' }}
                  h={{ base: '2rem', sm: '3.75rem' }}
                  color="#FFBA08"
                />
              </Box>
            ) : (
              <Box
                as="button"
                onClick={() => handleSlide('right')}
                disabled
                cursor="not-allowed"
              >
                <ChevronRightIcon
                  w={{ base: '2rem', sm: '3.75rem' }}
                  h={{ base: '2rem', sm: '3.75rem' }}
                  color="#999999"
                />
              </Box>
            )}
          </Center>
          <Box gridArea="top" m="0 auto" />
          <HStack
            gridArea="botton"
            h="1rem"
            spacing={{ base: '.5rem', sm: '0.75rem' }}
            m="0 auto"
          >
            {continents.map((_, idx) => {
              return (
                <Box
                  key={idx}
                  as="button"
                  w={{ base: '.5rem', sm: '1rem' }}
                  h={{ base: '.5rem', sm: '1rem' }}
                  borderRadius={{ base: '.25rem', sm: '.5rem' }}
                  bg={index === idx ? '#FFBA08' : '#999999'}
                  onClick={() => setIndex(idx)}
                />
              );
            })}
          </HStack>
        </Grid>
      </Center>
    </>
  );
}

export { Swiper };
