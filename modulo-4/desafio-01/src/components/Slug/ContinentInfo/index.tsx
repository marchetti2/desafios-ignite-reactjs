import {
  VStack,
  HStack,
  Text,
  Tooltip,
  Center,
  Flex,
  Box,
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';

interface ContinentInfoNumbersProps {
  countries: number;
  languages: number;
  about: string;
  popularCities: number;
}

function ContinentInfo({
  countries,
  languages,
  about,
  popularCities,
}: ContinentInfoNumbersProps): JSX.Element {
  return (
    <Box
      m={{
        base: '1.5rem auto 1rem auto',
        sm: '2.25rem auto 1.5rem auto',
        md: '5rem auto',
      }}
      w="100%"
      px={{ base: '1.5rem', md: '2.812rem' }}
    >
      <Flex flexDirection={{ base: 'column', md: 'row' }}>
        <Text
          variant="regular-24px-dark.400"
          maxW={{ base: '100%', md: '37.5rem' }}
          textAlign="justify"
          mr={{ base: '0', md: '4.375rem' }}
          mb={{ base: '1rem', sm: '2rem', md: '0' }}
        >
          {about}
        </Text>
        <HStack
          spacing={{ base: '.5rem', sm: '.8rem', md: '2.6rem' }}
          justifyContent="space-between"
        >
          <VStack alignItems={{ base: 'flex-start', sm: 'center' }}>
            <Text variant="semibold-48px-highlight">{countries}</Text>
            <Text variant="semibold-24px-dark.400">países</Text>
          </VStack>
          <VStack alignItems={{ base: 'flex-start', sm: 'center' }}>
            <Text variant="semibold-48px-highlight">{languages}</Text>
            <Text variant="semibold-24px-dark.400">línguas</Text>
          </VStack>
          <VStack alignItems={{ base: 'flex-start', sm: 'center' }}>
            <Text variant="semibold-48px-highlight">{popularCities}</Text>
            <Center>
              <Text
                variant="semibold-24px-dark.400"
                w={{ base: '7.5rem', sm: '10.38rem' }}
              >
                cidades +100
              </Text>
              <Tooltip
                label="As cidades mais populares do continente, no ranking mundial de 100.
          Fonte: Euromonitor International"
                closeOnClick={false}
                placement="bottom"
                bg="light.500"
                color="dark.300"
                border="1px"
                borderColor="highlight.400"
                mt="0.625rem"
                w="14.375rem"
              >
                <InfoOutlineIcon
                  h={{ base: '.625rem', sm: '1rem' }}
                  w={{ base: '.625rem', sm: '1rem' }}
                  color="dark.200"
                  ml={{ base: '.312rem', sm: '.5rem' }}
                />
              </Tooltip>
            </Center>
          </VStack>
        </HStack>
      </Flex>
    </Box>
  );
}

export { ContinentInfo };

/*



*/
