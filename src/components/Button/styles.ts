import styled from "styled-components";

export const Container = styled.button`
    width: 10rem;
    height: 3rem;
    background-color: ${({ theme }) => theme.button.thirdy};
    border-radius: 0.4rem;
    color: #fff;
    cursor: ${({ disabled }) => !disabled && "pointer"};
    font-weight: 500;
    font-family: var(--font-SotoSans);
    transition: all 0.2s linear;
    opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};

    svg {
        margin-top: -0.2rem;
        margin-right: 0.5rem;
    }

    &:hover {
        opacity: ${({ disabled }) => !disabled && 0.8};
    }
`;
