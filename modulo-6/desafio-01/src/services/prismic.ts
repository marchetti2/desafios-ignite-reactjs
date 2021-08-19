import Prismic from '@prismicio/client';
import { DefaultClient } from '@prismicio/client/types/client';

export async function getPrismicClient(req?: unknown): Promise<DefaultClient> {
  const prismic = Prismic.client(process.env.PRISMIC_API_ENDPOINT, {
    req,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });

  return prismic;
}
