import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";

import SEO from "../../next-seo.config";
import GlobalStyles from "../styles/GlobalStyle";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <DefaultSeo {...SEO} />
            <GlobalStyles />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
