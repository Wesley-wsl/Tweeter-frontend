import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import SEO from "../../next-seo.config";
import Header from "../components/Header";
import { AuthProvider } from "../contexts/AuthContext";
import GlobalStyles from "../styles/GlobalStyle";

function MyApp({ Component, pageProps }: AppProps) {
    const { asPath } = useRouter();

    return (
        <>
            <DefaultSeo {...SEO} />
            <GlobalStyles />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                newestOnTop
                closeOnClick
                rtl={false}
                draggable={true}
                pauseOnHover
                transition={Zoom}
                theme="light"
            />
            <NextNProgress color="#2F80ED" startPosition={0.5} />
            <AuthProvider>
                {asPath === "/" || asPath === "/signup" ? (
                    <Component {...pageProps} />
                ) : (
                    <>
                        <Header />
                        <Component {...pageProps} />{" "}
                    </>
                )}
            </AuthProvider>
        </>
    );
}

export default MyApp;
