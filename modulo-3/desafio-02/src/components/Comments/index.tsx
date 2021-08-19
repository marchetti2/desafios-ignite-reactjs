import { useEffect } from 'react';

import styles from './comments.module.scss';

export default function Comments(): JSX.Element {
  useEffect(() => {
    const script = document.createElement('script');
    const anchor = document.getElementById('comments');
    script.setAttribute('src', 'https://utteranc.es/client.js');
    script.setAttribute('crossorigin', 'anonymous');
    script.setAttribute('async', 'true');
    script.setAttribute('repo', 'marchetti2/blog-comments-utterances');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('theme', 'photon-dark');
    anchor.appendChild(script);
  }, []);

  return <div id="comments" className={styles.comments} />;
}
