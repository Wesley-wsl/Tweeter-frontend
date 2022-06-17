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

    h1 {
        text-align: center;
        color: ${({ theme }) => theme.text.grey_100};
    }
`;

export const Search = styled.form`
    position: relative;
    margin-bottom: 2rem;
    border: 0.1rem solid ${({ theme }) => theme.border.primary};
    border-radius: 1rem;

    input {
        height: 5.4rem;
        width: 100%;
        background-color: ${({ theme }) => theme.background.thirdy};
        padding: 0 5rem;
        border-radius: 1rem;
        padding-right: 11rem;
        outline: none;
        transition: border 0.3s linear;
        border: 0.1rem solid transparent;
        font-size: 1.6rem;
        font-weight: 500;
        font-family: ${({ theme }) => theme.text.grey_400};
        color: ${({ theme }) => theme.text.primary};

        &:focus {
            border: 0.1rem solid ${({ theme }) => theme.button.primary};
        }

        &::placeholder {
            color: ${({ theme }) => theme.text.grey_400};
            font-size: 1.6rem;
            font-weight: 500;
            font-family: ${({ theme }) => theme.fonts.secondary};
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
        font-family: ${({ theme }) => theme.fonts.secondary};
        background-color: ${({ theme }) => theme.button.primary};
    }
`;

export const Cards = styled.div`
    background-color: ${({ theme }) => theme.background.thirdy};
    border-radius: 0.8rem;

    div:nth-child(1) {
        border: none;
    }

    span {
        margin: 0;
    }
`;
