import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import SEO from "../../next-seo.config";
import { store } from "../redux/store";
import GlobalStyles from "../styles/GlobalStyle";

function MyApp({ Component, pageProps }: AppProps) {
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
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </>
    );
}

export default MyApp;
