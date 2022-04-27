import GlobalStyles from "../src/styles/GlobalStyle";

const withGlobalStyles = story => (
    <>
        <GlobalStyles />
        {story()}
    </>
);

export default withGlobalStyles;
