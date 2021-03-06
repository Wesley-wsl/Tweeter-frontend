import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    max-width: fit-content;
    max-height: fit-content;
    margin: auto;
    overflow: hidden;
    z-index: 9999;
`;

export const Background = styled.div`
    background-color: #0008;
    position: fixed;
    backdrop-filter: blur(0.2rem);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
`;
