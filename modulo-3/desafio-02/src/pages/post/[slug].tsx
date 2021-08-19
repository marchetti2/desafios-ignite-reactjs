import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import PrismicDOM from 'prismic-dom';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';
import { ParsedUrlQuery } from 'querystring';

import Header from '../../components/Header';
import { getPrismicClient } from '../../services/prismic';
import Divider from '../../components/Divider';
import Comments from '../../components/Comments';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  last_publication_date: string | null;
  uid: string;
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

interface ResultsData {
  data: {
    title: string;
  };
  uid: string;
}

interface Page {
  title?: string;
  uid?: string;
}

interface PreviewDataProps {
  ref: string;
}

interface PreviewProps {
  params: ParsedUrlQuery;
  preview: boolean;
  previewData?: PreviewDataProps | null;
}

interface PostProps {
  post: Post;
  results: ResultsData[];
  preview: boolean;
}

export default function Post({
  post,
  results,
  preview,
}: PostProps): JSX.Element {
  const { first_publication_date, last_publication_date } = post;
  const { title, author, banner, content } = post.data;
  const { url } = banner;
  const [page, setPage] = useState<Page[]>([
    { title: null, uid: null },
    { title: null, uid: null },
  ]);

  const router = useRouter();

  useEffect(() => {
    const arrayPosts = results.map(posts => {
      return {
        title: posts.data.title,
        uid: posts.uid,
      };
    });

    const postIndex = arrayPosts.findIndex(posts => posts.title === title);

    if (postIndex === 0) {
      setPage([
        { title: null, uid: null },
        {
          title: arrayPosts[postIndex + 1].title,
          uid: arrayPosts[postIndex + 1].uid,
        },
      ]);
      return;
    }
    if (postIndex === arrayPosts.length - 1) {
      setPage([
        {
          title: arrayPosts[postIndex - 1].title,
          uid: arrayPosts[postIndex - 1].uid,
        },
        { title: null, uid: null },
      ]);
      return;
    }

    setPage([
      {
        title: arrayPosts[postIndex - 1].title,
        uid: arrayPosts[postIndex - 1].uid,
      },
      {
        title: arrayPosts[postIndex + 1].title,
        uid: arrayPosts[postIndex + 1].uid,
      },
    ]);
  }, [results, title]);

  const dateFormated = format(new Date(first_publication_date), 'dd MMM yyyy', {
    locale: ptBR,
  });

  const lastEditPost = useCallback(() => {
    const lastEditDateFormated = format(
      new Date(last_publication_date),
      'dd MMM yyyy',
      {
        locale: ptBR,
      }
    );

    const lastEditHourFormated = format(
      new Date(last_publication_date),
      'HH:mm',
      {
        locale: ptBR,
      }
    );

    const response = `* editado em ${lastEditDateFormated}, às ${lastEditHourFormated}`;

    return response;
  }, [last_publication_date]);

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
            <div className={styles.changed}>
              {last_publication_date && <p>{lastEditPost()}</p>}
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
          <Divider />
          <div className={styles.navigation}>
            {page[0].title ? (
              <span>
                <h1>{page[0].title}</h1>
                <a href={`/post/${page[0].uid}`}>Post anterior</a>
              </span>
            ) : (
              <span />
            )}

            {page[1].title ? (
              <span>
                <h1>{page[1].title}</h1>
                <a href={`/post/${page[1].uid}`}>Próximo post</a>
              </span>
            ) : (
              <span />
            )}
          </div>
          <Comments />
          {preview && (
            <aside>
              <Link href="/api/exit-preview">
                <a>Sair do modo Preview</a>
              </Link>
            </aside>
          )}
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

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData,
}: PreviewProps) => {
  const prismic = getPrismicClient();
  const parseUid = String(params.slug);

  const response = await prismic.getByUID('posts', parseUid, {
    ref: previewData?.ref ?? null,
  });
  const { results } = await prismic.query('', {
    ref: previewData?.ref ?? null,
  });
  const { first_publication_date, data, uid, last_publication_date } = response;

  return {
    props: {
      post: {
        first_publication_date,
        last_publication_date,
        data,
        uid,
      },
      results,
      preview,
    },
  };
};
