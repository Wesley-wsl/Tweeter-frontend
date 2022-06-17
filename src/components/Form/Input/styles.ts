import styled from "styled-components";

interface IInputContainer {
    margin: string;
}

export const Container = styled.div<IInputContainer>`
    position: relative;

    input {
        background-color: ${({ theme }) => theme.background.input};
        padding: 1.5rem;
        width: 25rem;
        margin-bottom: ${({ margin }) => margin};
        border-radius: 0.4rem;
        padding-right: 3.5rem;
        outline: none;
        transition: border 0.3s linear;
        border: 0.1rem solid transparent;
        border-bottom: 0.1rem solid ${({ theme }) => theme.button.primary};
        color: ${({ theme }) => theme.text.primary};

        &::placeholder {
            letter-spacing: 0.13rem;
            font-family: var(--font-NotoSans);
        }
        &:focus {
            border: 0.1rem solid ${({ theme }) => theme.button.primary};
        }
    }

    .formIcon {
        position: absolute;
        top: 1.3rem;
        right: 0.7rem;
        cursor: pointer;
    }
`;

export const ErrorMessage = styled.p`
    color: red;
    font-size: 1.2rem;
    font-weight: 500;
    font-family: var(--font-NotoSans);
    text-align: center;
    opacity: 0.9;
`;
