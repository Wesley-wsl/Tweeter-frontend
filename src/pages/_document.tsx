import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
} from "next/document";
class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const originalRenderPage = ctx.renderPage;

        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: App => App,
                enhanceComponent: Component => Component,
            });

        const initialProps = await Document.getInitialProps(ctx);
        return initialProps;
    }

    render() {
        return (
            <Html>
                <Head>
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossOrigin=""
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        rel="shortcut icon"
                        href="/assets/tweeter-small.svg"
                        type="image/svg"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
