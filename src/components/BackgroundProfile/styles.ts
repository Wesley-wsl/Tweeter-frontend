import styled from "styled-components";

import { IImage } from "../../@types";

export const Container = styled.div<IImage>`
    filter: contrast(120%);
    background-color: black;
    display: flex;
    background-image: url(${({ image }) => image});
    background-size: cover;
    background-position: center center;
    height: 25rem;
    position: relative;

    .changeImage {
        transition: all 0.2s linear;
        position: absolute;
        cursor: pointer;
        top: 0rem;
        right: 0rem;
        left: 0rem;
        bottom: 0rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #0008;
        svg {
            z-index: 9999;
            cursor: pointer;
        }
        opacity: 0;

        &:hover {
            opacity: 1;
        }
    }
`;
