import styled from "styled-components";

export const Button = styled.button`
    width: 100%;
    max-width: 25rem;
    font-size: var(--x-small);
    font-weight: 600;
    margin-top: 1rem;
    background-color: ${({ theme }) => theme.button.thirdy};
    color: #fff;
    padding: 1.5rem 8.67rem;
    border-radius: 0.5rem;
    transition: all 0.2s;
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4.6rem;

    &:hover {
        background-color: ${({ theme }) => theme.button.hover};
        cursor: pointer;
    }

    &:disabled {
        opacity: 0.5;
    }
`;
