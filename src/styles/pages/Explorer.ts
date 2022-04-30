import styled from "styled-components";

export const Container = styled.main`
    display: flex;
    max-width: 100rem;
    margin: 0 auto;
    justify-content: space-between;
    margin-top: 2rem;

    ul {
        flex: 0.7;
        border-radius: 2rem;
    }

    > div {
        flex: 2;
    }
`;

export const TweetsContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 2rem;
    margin-bottom: 2rem;
`;

export const Search = styled.div`
    position: relative;
    margin-bottom: 2rem;

    input {
        height: 5.4rem;
        width: 100%;
        background-color: #fff;
        padding: 0 5rem;
        border-radius: 1rem;
        padding-right: 11rem;
        outline: none;
        transition: border 0.3s linear;
        border: 0.1rem solid transparent;
        font-size: 1.6rem;
        font-weight: 500;
        font-family: var(--font-NotoSans);
        &:focus {
            border: 0.1rem solid var(--blue-one);
        }

        &::placeholder {
            color: var(--grey-four);
            font-size: 1.6rem;
            font-weight: 500;
            font-family: var(--font-NotoSans);
        }
    }

    svg {
        position: absolute;
        top: 1.5rem;
        left: 1.2rem;
    }

    button {
        position: absolute;
        top: 1.1rem;
        right: 1.2rem;
        width: 8.5rem;
        height: 3.2rem;
        font-size: 1.2rem;
        font-family: var(--font-NotoSans);
    }
`;
