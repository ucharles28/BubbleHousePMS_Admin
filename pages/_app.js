import Meta from '../components/Meta'
import '../styles/globals.css'
import "../styles/nprogress.css";
import Router from 'next/router';
import '../styles/tailwind.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import nProgress from "nprogress";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Meta />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
