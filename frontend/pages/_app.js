import '@/styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false;
import { AuthProvider } from '@/context/Auth';
import { PageProvider } from '@/context/Page';


export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <PageProvider>
        <Component {...pageProps} />
      </PageProvider>
    </AuthProvider>
  )
}
