import { Image, Box, Text, VStack, Flex, Heading } from '@chakra-ui/react';

interface CardProps {
  city: string;
  imgUrl: string;
  country: string;
  flag: string;
}

function Card({ city, imgUrl, country, flag }: CardProps): JSX.Element {
  return (
    <Box
      overflow="hidden"
      w="16rem"
      h="17.44rem"
      border="1px"
      borderColor="rgba(255, 186, 8, 0.5)"
      borderRadius="4px"
    >
      <Image src={imgUrl} alt={city} w="256px" h="62%" />
      <Flex h="38%">
        <Flex
          m="auto"
          w="100%"
          h="100%"
          alignItems="center"
          justifyContent="space-between"
          p="0 1.5rem"
        >
          <VStack alignItems="flex-start">
            <Heading variant="semibold-20px-dark.400-barlow">{city}</Heading>
            <Text variant="regular-16px-dark.300-barlow">{country}</Text>
          </VStack>
          <Box>
            <Image
              src={flag}
              alt={country}
              w="1.875rem"
              h="1.875rem"
              borderRadius="0.937rem"
            />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

export { Card };
