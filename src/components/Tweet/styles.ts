import styled from "styled-components";

export const Container = styled.div`
    background-color: #fff;
    padding: 2rem;
    margin-bottom: 3.5rem;
    border-radius: 2rem;
    border: 0.1rem solid var(--border-one);

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

    ul {
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
    }

    .divider {
        width: 100%;
        height: 0.1rem;
        background-color: #000;
        opacity: 0.1;
        margin: 1rem 0;
    }
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

export const Comment = styled.div`
    image {
        cursor: pointer;
        margin-right: 1rem;
    }

    display: flex;
    align-items: center;

    div {
        position: relative;
        width: 100%;
        input {
            padding: 1.3rem;
            width: 97%;
            padding-right: 3rem;
            background-color: var(--background-color);
            border-bottom: 1rem;
            margin-left: 2rem;
            margin-right: 2rem;
        }

        svg {
            position: absolute;
            top: 30%;
            right: 1rem;
            opacity: 0.3;
            cursor: pointer;
        }
    }
`;
