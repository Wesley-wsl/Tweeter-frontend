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
    cursor: pointer;
    width: fit-content;

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

export const Comment = styled.p`
    font-size: 1.6rem;
    font-family: var(--font-NotoSans);
    color: var(--grey-two);
    margin-left: 6.5rem;
    margin-bottom: 1.5rem;
    margin-top: -0.6rem;
    max-width: 67rem;
    word-break: break-all;
    text-align: justify;
    white-space: pre-line;
`;

export const LikeInformations = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 5.5rem;
    margin-top: 1rem;
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--grey-four);
    cursor: pointer;
    width: fit-content;

    &.liked {
        color: var(--red-one);
    }

    p:nth-child(1) {
        font-family: var(--font-NotoSans);
        margin-right: 1rem;
        svg {
            margin-right: 0.4rem;
        }
    }
`;
