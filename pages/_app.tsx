import '../styles/globals.css'
import Layout from "../components/Layout";

//wrap every single page

function MyApp({Component, pageProps}) {
    return <Layout> <Component {...pageProps} /></Layout>
}

export default MyApp
