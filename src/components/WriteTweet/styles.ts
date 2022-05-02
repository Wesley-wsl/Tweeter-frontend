import styled from "styled-components";

export const Container = styled.div`
    padding: 2rem 2rem 1rem 2rem;
    background-color: #fff;
    border-radius: 2rem;
    margin: 2rem 0;

    > p {
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--grey-two);
        border-bottom: 0.1rem solid var(--grey-five);
        padding-bottom: 1rem;
        margin-bottom: 1rem;
        border-radius: 0.4rem;
    }
`;

export const Write = styled.div`
    display: flex;

    img {
        border-radius: 2rem;
    }

    textarea {
        margin-top: 1rem;
        margin-left: 2rem;
        outline: none;
        width: 89%;
        resize: vertical;
        height: 5rem;
        max-height: 50rem;

        &::placeholder {
            color: var(--grey-four);
            font-weight: 500;
        }
    }
`;

export const Filter = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1rem;
    align-items: center;

    div {
        display: flex;
        gap: 1rem;
        margin-left: 7rem;

        svg {
            cursor: pointer;
        }

        p {
            font-weight: 500;
            font-family: var(--font-NotoSans);
            font-size: 1.2rem;
            color: var(--blue-one);
            cursor: pointer;
        }
    }

    button {
        width: 8rem;
    }
`;
