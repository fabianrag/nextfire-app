import NavBar from '@/components/Navbar'
import { UserContext } from '@/lib/context'
import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }) {
  return (
    <UserContext.Provider value={{ user: {}, username: 'jeff' }}>
      <NavBar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  )
}
