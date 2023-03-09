import styles from '@/styles/Post.module.css'
import PostContent from '@/components/PostContent'
import { db, getUserWithUsername, postToJSON } from '@/lib/firebase'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import {
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  query,
} from 'firebase/firestore'

export async function getStaticProps({ params }) {
  const { username, slug } = params
  const userDoc = await getUserWithUsername(username)

  let post
  let path

  if (userDoc) {
    path = `users/${userDoc.id}/posts/${slug}`
    const postRef = doc(db, 'users', userDoc.id, 'posts', slug)
    const getPost = await getDoc(postRef)
    post = postToJSON(getPost)
  }

  return {
    props: { post, path },
    revalidate: 100,
  }
}

export async function getStaticPaths() {
  const snapshot = await getDocs(query(collectionGroup(db, 'posts')))
  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data()
    return {
      params: { username, slug },
    }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}

export default function Post(props) {
  const postRef = doc(db, props.path)
  const [realtimePost] = useDocumentData(postRef)

  const post = realtimePost || props.post

  return (
    <main className={styles.container}>
      <section>
        <PostContent post={post} />
      </section>

      <aside className='card'>
        <p>
          <strong>{post.heartCount || 0} ❤️</strong>
        </p>
      </aside>
    </main>
  )
}
