import { VStack, HStack, Image, Text, Box, Flex } from '@chakra-ui/react';

interface TravelTypesComponentProps {
  title: string;
  icon: string;
}

function TravelTypesComponent({
  title,
  icon,
}: TravelTypesComponentProps): JSX.Element {
  return (
    <Flex
      flexDirection={{ base: 'row', sm: 'column' }}
      alignItems="center"
      justifyContent="center"
      mb=".7rem"
    >
      <Image
        display={{ base: 'none', sm: 'inline' }}
        src={icon}
        alt={title}
        w="5.312rem"
        h="5.312rem"
        mb="1.25rem"
      />
      <Box
        display={{ base: 'inline', sm: 'none' }}
        w=".5rem"
        h=".5rem"
        borderRadius=".25rem"
        bg="#FFBA08"
        mr=".5rem"
      />
      <Text variant="semibold-24px-dark.400" textAlign="center">
        {title}
      </Text>
    </Flex>
  );
}

function TravelTypes(): JSX.Element {
  return (
    <>
      <Box display={{ base: 'none', sm: 'inline' }}>
        <Flex
          m={{
            base: '2.25rem 0',
            sm: '4.5rem 0 5rem 0',
            md: '7.13rem 0 5rem 0',
          }}
          flexDir={{ base: 'column', md: 'row' }}
        >
          <Flex
            w={{ sm: '100%', md: '60%' }}
            mb={{ sm: '2.5rem', md: '0' }}
            px={{ sm: '1.5rem', md: '0' }}
            justifyContent="space-around"
          >
            <TravelTypesComponent title="vida noturna" icon="cocktail.svg" />
            <TravelTypesComponent title="praia" icon="surf.svg" />
            <TravelTypesComponent title="moderno" icon="building.svg" />
          </Flex>
          <Flex
            w={{ sm: '100%', md: '40%' }}
            px={{ sm: '5rem', md: '0' }}
            justifyContent="space-around"
          >
            <TravelTypesComponent title="clássico" icon="museum.svg" />
            <TravelTypesComponent title="e mais..." icon="earth.svg" />
          </Flex>
        </Flex>
      </Box>

      <Box display={{ base: 'inline', sm: 'none' }}>
        <Flex
          m="2.25rem 0 1.7rem 0"
          flexDir={{ base: 'column', md: 'row' }}
          justifyContent="center"
          alignItems="center"
        >
          <HStack
            maxW="17.18rem"
            w="100%"
            justifyContent="space-between"
            mb="1.75rem"
          >
            <VStack alignItems="flex-start" spacing="1.5rem">
              <TravelTypesComponent title="vida noturna" icon="cocktail.svg" />
              <TravelTypesComponent title="moderno" icon="building.svg" />
            </VStack>
            <VStack alignItems="flex-end" spacing="1.5rem">
              <TravelTypesComponent title="praia" icon="surf.svg" />
              <TravelTypesComponent title="clássico" icon="museum.svg" />
            </VStack>
          </HStack>
          <Flex justifyContent="center">
            <TravelTypesComponent title="e mais..." icon="earth.svg" />
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export { TravelTypes };
