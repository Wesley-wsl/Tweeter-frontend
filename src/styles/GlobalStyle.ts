import { createGlobalStyle } from "styled-components";

import { ITheme } from "../@types";

const GlobalStyles = createGlobalStyle<ITheme>`

:root {
    --x-small: 1.4rem;
    --small: 2rem;
    --x-medium: 3rem;
    --medium: 4rem;
    --large: 4.8rem;
}

* {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
}

html {
    font-size: 62.5%;
    scroll-behavior: smooth;
}

body {
    font-family: "Poppins", "Noto Sans", --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: ${({ theme }) => theme.background.secondary};
}

&::-webkit-scrollbar {
        width: 1rem;
    }

&::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.scroll.track}
}

&::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.scroll.thumb} ;
}

`;

export default GlobalStyles;
