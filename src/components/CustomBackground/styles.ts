import styled from "styled-components";

import { IBackgroundCustomStyle } from "../../@types";

export const Background = styled.main<IBackgroundCustomStyle>`
    width: 100vw;
    height: 100vh;
    display: flex;
    background-image: url(${({ image }) => image});
    background-size: cover;
    background-position: center bottom;
`;

export const BackgroundFilter = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    backdrop-filter: blur(0.5rem) contrast(200%) brightness(70%);
`;
