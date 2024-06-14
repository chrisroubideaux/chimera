import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';
import '@/styles/navbar.css';
//import '@/styles/card.css';
import '@/styles/form.css';
import '@/styles/calendar.css';
import '@/styles/graph.css';
import '@/styles/modal.css'

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);
  return <Component {...pageProps} />;
}