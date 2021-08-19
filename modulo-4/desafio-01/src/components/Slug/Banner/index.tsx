import { Flex, Heading, Box } from '@chakra-ui/react';

interface BannerProps {
  banner: string;
  name: string;
}

function Banner({ banner, name }: BannerProps): JSX.Element {
  return (
    <Flex
      w="100%"
      h={{base:'9.37rem',sm:"31.25rem"}}
      bgImage={`url(${banner})`}
      bgSize="cover"
      alignItems={{base:"center",sm:"flex-end"}}
      justifyContent={{base:"center",sm:"flex-start"}}
    >
      <Box pl={{base:"0",sm:"8.75rem"}} pb={{base:"0",sm:"3.687rem"}}>
        <Heading variant="semibold-48px" textAlign="center">
          {name}
        </Heading>
      </Box>
    </Flex>
  );
}

export { Banner };


