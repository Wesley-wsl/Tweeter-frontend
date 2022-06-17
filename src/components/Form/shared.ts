import styled from "styled-components";

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme }) => theme.background.hover};
    padding: 4rem 5rem;
    border-radius: 2rem;
    box-shadow: 0rem 0rem 1rem ${({ theme }) => theme.button.boxShadow};
    height: 43rem;
    margin: auto;
    justify-content: space-between;

    span {
        margin-bottom: 0.7rem;
    }

    p > a {
        margin-top: 2rem;
        font-size: var(--x-small);
        font-weight: 400;
        color: ${({ theme }) => theme.button.primary};
        font-family: ${({ theme }) => theme.fonts.secondary};
    }

    @media (max-width: 354px) {
        padding: 2.5rem 3.5rem;
    }
`;
