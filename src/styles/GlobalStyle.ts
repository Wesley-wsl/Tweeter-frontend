import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

:root {
    --x-small: 1.4rem;
    --small: 2rem;
    --x-medium: 3rem;
    --medium: 4rem;
    --large: 4.8rem;
    --blue-one: #2F80ED;
    --blue-two: #2D9CDB;
    --background-color: #F2F2F2;
    --grey-one: #333333;
    --grey-two: #4F4F4F;
    --grey-three: #828282;
    --grey-four: #BDBDBD;
    --grey-five: #E0E0E0;
    --red-one:#EB5757 ;
    --green-one: #27AE60;
    --font-poppins: "Poppins" ;
    --font-NotoSans: "Noto Sans" ;
}

* {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
}

html {
    font-size: 62.5%;
}

body {
    font-family: "Poppins", "Noto Sans", --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--background-color);
}

`;

export default GlobalStyles;
