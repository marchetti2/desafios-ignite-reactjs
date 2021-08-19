import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { onOpen, isOpen, onClose } = useDisclosure();

  const [urlImg, setUrlImg] = useState('');

  function handleViewImage(url: string): void {
    setUrlImg(url);
    onOpen();
  }

  return (
    <>
      <SimpleGrid
        maxW="60.125rem"
        templateColumns="repeat(auto-fill, 18.33rem)"
        gap="2.5rem"
        mb="2.5rem"
      >
        {cards?.map(card => {
          const { description, id, title, ts, url } = card;
          return (
            <Card
              key={id}
              data={{ description, title, ts, url }}
              viewImage={() => handleViewImage(url)}
            />
          );
        })}
      </SimpleGrid>
      <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={urlImg} />
    </>
  );
}
