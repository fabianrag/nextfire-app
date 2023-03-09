import { getUserWithUsername, postToJSON } from '@/lib/firebase'
import UserProfile from '@/components/UserProfile'
import PostFeed from '@/components/PostFeed'
import {
  collection,
  query as query2,
  limit,
  orderBy,
  where,
  getDocs,
} from 'firebase/firestore'

export async function getServerSideProps({ query }) {
  const { username } = query

  const userDoc = await getUserWithUsername(username)

  //If no user, short circuit to 404 page
  if (!userDoc) {
    return {
      notFound: true,
    }
  }

  //JSON serializable data
  let user = null
  let posts = null

  if (userDoc) {
    user = userDoc.data()
    const postsQuery = query2(
      collection(userDoc.ref, 'posts'),
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      limit(5)
    )

    const postsSnap = await getDocs(postsQuery)
    posts = postsSnap.docs.map(postToJSON)
  }

  return {
    props: { user, posts },
  }
}

export default function UserProfilePage({ user, posts }) {
  return (
    <main>
      <UserProfile user={user} />
      <PostFeed posts={posts} />
    </main>
  )
}
