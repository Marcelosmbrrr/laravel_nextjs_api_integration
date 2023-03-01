import '@/styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { AuthProvider } from '@/context/Auth';
import { PageProvider } from '@/context/Page';
import { MenuOpenProvider } from '@/context/MenuOpen';

config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <PageProvider>
        <MenuOpenProvider >
          <Component {...pageProps} />
        </MenuOpenProvider>
      </PageProvider>
    </AuthProvider>
  )
}
