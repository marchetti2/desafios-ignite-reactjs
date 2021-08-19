import {
  Grid,
  Center,
  Heading,
  Text,
  Box,
  Image,
  Flex,
} from '@chakra-ui/react';

function Banner(): JSX.Element {
  return (
    <Grid
      w="100%"
      h={{ base: '10.19rem', sm: '20.93rem' }}
      bgImage="url('banner.svg')"
      gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}
    >
      <Center pl="3rem" pr="1rem">
        <Flex
          flexDir="column"
          justifyContent="start"
          maxW={{ base: '20.81rem', sm: '32.75rem' }}
        >
          <Heading textAlign="left" pb={{ base: '.5rem', sm: '1.25rem' }}>
            5 Continentes, <br /> infinitas possibilidades.
          </Heading>
          <Text textAlign="left">
            Chegou a hora de tirar do papel a viagem que você sempre sonhou.
          </Text>
        </Flex>
      </Center>
      <Flex
        display={{ base: 'none', md: 'flex' }}
        alignItems="center"
        justifyContent="center"
      >
        <Box pt="4.75rem" px="1rem">
          <Image
            w="26.07rem"
            h="16.92rem"
            transform="rotate(3deg)"
            src="airplane.svg"
            alt="airplane"
          />
        </Box>
      </Flex>
    </Grid>
  );
}

export { Banner };
