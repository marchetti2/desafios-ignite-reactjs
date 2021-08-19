import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import PrismicDOM from 'prismic-dom';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';

import Header from '../../components/Header';
import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  const { first_publication_date } = post;
  const { title, author, banner, content } = post.data;
  const { url } = banner;

  const router = useRouter();

  const dateFormated = format(new Date(first_publication_date), 'dd MMM yyyy', {
    locale: ptBR,
  });

  const estimatedTimeToRead = useCallback(() => {
    const contentArray = content.reduce((acc, cur) => {
      return [...acc, ...cur.body];
    }, []);

    const allBodyString = PrismicDOM.RichText.asText(contentArray);

    const time = Math.ceil(allBodyString.split(' ').length / 200);

    return time;
  }, [content]);

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <Header />
      <main className={commonStyles.container}>
        <img className={styles.banner} src={url} alt={title} />
        <div className={commonStyles.content}>
          <article className={styles.article}>
            <h1>{title}</h1>
            <div>
              <span>
                <FiCalendar size="20px" color="#bbb" />
                <p>{dateFormated}</p>
              </span>
              <span>
                <FiUser size="20px" color="#bbb" />
                <p>{author}</p>
              </span>
              <span>
                <FiClock size="20px" color="#bbb" />
                <p>{estimatedTimeToRead()} min</p>
              </span>
            </div>

            {content.map(data => {
              return (
                <section key={data.heading}>
                  <h1>{data.heading}</h1>
                  <div
                    className={styles.body}
                    dangerouslySetInnerHTML={{
                      __html: PrismicDOM.RichText.asHtml(data.body),
                    }}
                  />
                </section>
              );
            })}
          </article>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query('');

  const paths = posts.results.map(post => {
    return {
      params: { slug: post.uid },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prismic = getPrismicClient();
  const parseUid = String(params.slug);
  const response = await prismic.getByUID('posts', parseUid, {});
  const { first_publication_date, data, uid } = response;

  return {
    props: {
      post: {
        first_publication_date,
        data,
        uid,
      },
    },
  };
};
