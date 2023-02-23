import { UserContext } from '@/lib/context'
import { auth, googleAuthProvider } from '@/lib/firebase'
import { signInWithPopup, signOut } from 'firebase/auth'
import { useContext } from 'react'

export default function EnterPage(props) {
  const { user, username } = useContext(UserContext)

  return (
    <main>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  )
}

function SignInButton() {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider)
  }

  return (
    <button className='btn-google' onClick={signInWithGoogle}>
      <img src={'/google.png'} /> Sign in with Google
    </button>
  )
}

function SignOutButton() {
  return <button onClick={() => signOut(auth)}>Sign Out</button>
}

function UsernameForm() {}
