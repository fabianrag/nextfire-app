import styles from '@/styles/Post.module.css'
import PostContent from '@/components/PostContent'
import { db, getUserWithUsername, postToJSON } from '@/lib/firebase'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { collection, collectionGroup, doc, getDoc, getDocs, query } from 'firebase/firestore'

export async function getStaticProps({ params }) {
  const { username, slug } = params
  const userDoc = await getUserWithUsername(username)

  let post
  let path

  if (userDoc) {
    path = `users/${userDoc.id}/posts/${slug}`;
    const postRef = doc(db, 'users', userDoc.id, 'posts', slug);
    post = postToJSON(await getDoc(postRef));
  }

  return {
    props: { post, path },
    revalidate: 5000
  }
}

export async function getStaticPaths() {
  const snapshot = await getDocs(query(collectionGroup(db, 'posts')))
  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data()
    return {
      params: { username, slug }
    }
  })

  return {
    paths,
    fallback: 'blocking'
  }
}

export default function Post(props) {
  return <main className={styles.container}>

  </main>
}
