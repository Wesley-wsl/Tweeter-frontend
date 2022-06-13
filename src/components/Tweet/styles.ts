import styled from "styled-components";

export const Container = styled.div`
    background-color: #fff;
    padding: 2rem;
    margin-bottom: 3.5rem;
    border-radius: 2rem;
    border: 0.1rem solid var(--border-one);
    position: relative;

    > p {
        max-width: 67rem;
        word-break: break-all;
        margin: 2rem 0;
        color: var(--grey-two);
        font-size: 1.6rem;
        font-family: var(--font-NotoSans);
        text-align: justify;
        white-space: pre-line;
    }

    img {
        border-radius: 1.5rem;
    }
`;

export const Actions = styled.ul`
    display: flex;
    justify-content: space-around;
    font-size: 1.4rem;
    font-weight: 500;
    font-family: var(--font-NotoSans);
    list-style: none;
    align-items: center;
    margin-bottom: 1rem;

    li {
        align-items: center;
        cursor: pointer;
        padding: 1rem;
        &:hover {
            background-color: var(--backgrond-color);
            border-radius: 0.2rem;
        }
    }

    li > svg {
        margin-right: 1.3rem;
    }

    .heart {
        color: var(--red-one);
    }

    .bookmark {
        color: var(--blue-one);
    }
`;

export const Divider = styled.div`
    width: 100%;
    height: 0.1rem;
    background-color: #000;
    opacity: 0.1;
    margin: 1rem 0;
`;

export const TopInformations = styled.div`
    display: flex;
    cursor: pointer;
    max-width: fit-content;

    div {
        margin-left: 1rem;

        p:nth-child(1) {
            font-size: 1.6rem;
            font-weight: 500;
        }

        p:nth-child(2) {
            font-size: 1.2rem;
            font-weight: 500;
            font-family: var(--font-NotoSans);
            color: var(--grey-four);
        }
    }
`;

export const Status = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 2rem;
    color: var(--grey-four);
    font-size: 1.2rem;
    margin: 1rem 0;
`;

export const LoadComment = styled.p`
    color: var(--grey-two);
    text-align: center;
    font-weight: 700;
    font-size: 1.4rem;
    cursor: pointer;
`;

export const DeleteTweet = styled.div`
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    opacity: 0.5;
    cursor: pointer;
    transition: all 0.2s linear;
    color: #000;

    &:hover {
        opacity: 1;
        color: var(--red-one);
    }
`;
