import styled from "styled-components";

export const Container = styled.button`
    width: 10rem;
    height: 3rem;
    background-color: var(--blue-one);
    border-radius: 0.4rem;
    color: #fff;
    cursor: pointer;
    font-weight: 500;
    font-family: var(--font-SotoSans);
    transition: all 0.2s linear;

    svg {
        margin-top: -0.2rem;
        margin-right: 0.5rem;
    }

    &:hover {
        background-color: var(--blue-two);
    }
`;
