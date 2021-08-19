import { Divider, Center } from '@chakra-ui/react';

function DividerComponent() {
  return (
    <Center>
      <Divider
        w={{ base: '3.75rem', sm: '5.625rem' }}
        border={{ base: '1px', sm: '2px' }}
        borderColor="dark.400"
      />
    </Center>
  );
}

export { DividerComponent };
