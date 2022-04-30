import styled from "styled-components";

export const Container = styled.div`
    margin: 2rem 0;
    background-color: var(--background-color);
    padding: 1rem;
    border-radius: 2rem;
    img {
        margin-right: 2rem;
    }
`;

export const TopInformations = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2rem;
    border-radius: 1rem;

    div {
        display: flex;
        align-items: center;
        gap: 2rem;

        p:nth-child(1) {
            color: #000;
            font-size: 1.4rem;
            font-weight: 500;
        }

        p:nth-child(2) {
            color: var(--grey-four);
            font-size: 1.2rem;
            font-weight: 500;
            font-family: var(--font-NotoSans);
        }
    }
`;

export const Comment = styled.div`
    > p {
        font-size: 1.6rem;
        font-family: var(--font-NotoSans);
        color: var(--grey-two);
        margin-left: 6.5rem;
        margin-bottom: 1.5rem;
        margin-top: -0.6rem;
    }

    div {
        display: flex;
        flex-direction: row;
        margin-left: 5rem;
        margin-top: 1rem;
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--grey-four);

        p:nth-child(1) {
            font-family: var(--font-NotoSans);
            margin-right: 2rem;
            cursor: pointer;
            svg {
                margin-right: 0.4rem;
            }
        }
    }
`;
