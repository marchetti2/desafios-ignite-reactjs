import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { FiCalendar, FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface PreviewDataProps {
  ref: string;
}

interface PreviewProps {
  preview: boolean;
  previewData?: PreviewDataProps | null;
}

interface HomeProps {
  postsPagination: PostPagination;
  preview: boolean;
}

export default function Home({
  postsPagination,
  preview,
}: HomeProps): JSX.Element {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    setPosts(postsPagination.results);
  }, [postsPagination.results]);

  async function handleLoadPages(): Promise<void> {
    if (postsPagination.next_page !== null) {
      const { results } = await (await fetch(postsPagination.next_page)).json();
      results.map((post: Post): void => {
        postsPagination.next_page = null;
        setPosts(oldPageState => [...oldPageState, post]);
        return null;
      });
    }
  }

  return (
    <main className={commonStyles.coontainer}>
      <div className={commonStyles.content}>
        <img className={styles.logo} src="/logo.svg" alt="logo" />
        <ul>
          {posts.map(post => {
            const date = format(
              new Date(post.first_publication_date),
              'dd MMM yyyy',
              { locale: ptBR }
            );

            return (
              <li key={post.uid} className={styles.card}>
                <Link href={`/post/${post.uid}`}>
                  <a>{post.data.title}</a>
                </Link>

                <p>{post.data.subtitle}</p>
                <div>
                  <span>
                    <FiCalendar size="20px" color="#bbb" />
                    <p>{date}</p>
                  </span>
                  <span>
                    <FiUser size="20px" color="#bbb" />
                    <p>{post.data.author}</p>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
        {postsPagination.next_page !== null ? (
          <button type="button" onClick={handleLoadPages}>
            <p>Carregar mais posts</p>
          </button>
        ) : null}
        {preview && (
          <aside>
            <Link href="/api/exit-preview">
              <a>Sair do modo Preview</a>
            </Link>
          </aside>
        )}
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async ({
  preview = false,
  previewData,
}: PreviewProps) => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query('', {
    pageSize: 2,
    ref: previewData?.ref ?? null,
  });

  const { next_page, results } = postsResponse;

  return {
    props: {
      postsPagination: {
        next_page,
        results,
      },
      preview,
    },
  };
};
