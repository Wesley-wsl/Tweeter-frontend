import styled from "styled-components";

export const Container = styled.div`
    position: relative;
    z-index: 2;
    div {
        display: flex;
        align-items: center;
        max-width: 13rem;
        cursor: pointer;

        p {
            font-size: var(--x-small);
            margin-right: 1rem;
        }

        span {
            background-color: #000;
            width: 3.2rem;
            height: 3.2rem;
            border-radius: 0.5rem;
            margin-right: 1rem;

            img {
                filter: contrast(120%);
            }
        }
    }
`;

export const Options = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: absolute;
    top: 150%;
    right: -3rem;
    left: -3rem;
    list-style: none;
    border-radius: 1rem;
    max-width: 20rem;
    background-color: #ffff;
    padding: 1rem;
    font-size: var(--x-small);

    li {
        display: flex;
        align-items: center;
        padding: 0.6rem;
        border-radius: 1rem;
        transition: all 0.2s linear;
        cursor: pointer;

        &:hover {
            background-color: var(--background-color-two);
        }

        svg {
            margin-right: 1rem;
        }
    }

    hr {
        background-color: var(--background-color-two);
        margin: 0 auto;
        width: 90%;
        height: 0.1rem;
    }
`;

export const Overlay = styled.div`
    background-color: transparent;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
`;
