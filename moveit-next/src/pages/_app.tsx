import { ChallengerProvider } from '../contexts/ChallengeContext';

import './../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <ChallengerProvider>
      <Component {...pageProps} />
    </ChallengerProvider>
  )
}

export default MyApp
