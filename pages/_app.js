import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';
import '@/styles/navbar.css';
import '@/styles/sidebar.css';
import '@/styles/form.css';
import '@/styles/calendar.css';
import '@/styles/graph.css';
import '@/styles/modal.css';
import '@/styles/avatar.css';

import { ParallaxProvider } from 'react-scroll-parallax';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51Qb82oDLzhvS0Smdn5yKUj8lhVkiauO93UntG4cQ1BK13Xnsb4x187XXIkuvgKQ3ATkNliEPlSgVEyGCzYKKazJ400QOYzqhYH'
);

export default function App({ Component, pageProps }) {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <ParallaxProvider>
      <Elements stripe={stripePromise}>
        <Component {...pageProps} />
      </Elements>
    </ParallaxProvider>
  );
}

{
  /*
export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);
  return <Component {...pageProps} />;
}
  */
}
