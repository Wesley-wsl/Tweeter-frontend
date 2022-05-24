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
    max-width: 50rem;
    max-height: 40rem;
    margin: auto;
    overflow: hidden;
    z-index: 9999;

    div {
        width: 50rem;
        height: 40rem;
        border: 0.1rem solid var(--border-one);
        background-color: #fff;
        border-radius: 1rem;
    }
`;

export const Background = styled.div`
    background-color: #0008;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
`;
