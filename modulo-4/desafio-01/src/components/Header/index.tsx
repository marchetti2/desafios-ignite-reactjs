import { Flex, Image, Box, Center } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Link as LinckChakra } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Header(): JSX.Element {
  const router = useRouter();
  return (
    <Flex
      as="header"
      maxWidth="90rem"
      justifyContent="space-between"
      h={{ base: '3.125rem', sm: '6.25rem' }}
      p={{base: "0 1rem",sm:"0 2rem", md:"0 8.75rem"}}
      m="0 auto"
    >
      {router.pathname !== '/' ? (
        <Center>
          <LinckChakra as={Link} href="/">
            <ChevronLeftIcon
              cursor="pointer"
              w={{ base: "1rem", sm: "2rem" }}
              h={{ base: "1rem", sm: "2rem" }}
              color="#47585B"
            />
          </LinckChakra>
        </Center>
      ) : (
        <Box />
      )}

      <Center >
        <Image src="logo.svg" alt="Logo" h={{base: "20px", sm:"45px"}} w={{base: "81px", sm:"184px"}} />
      </Center>
      <Box />
    </Flex>
  );
}

export { Header };
