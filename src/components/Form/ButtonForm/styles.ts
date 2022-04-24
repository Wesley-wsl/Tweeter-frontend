import styled from "styled-components";

export const Button = styled.button`
    width: 100%;
    font-size: var(--x-small);
    font-weight: 600;
    margin-top: 1rem;
    background-color: var(--blue-one);
    color: #fff;
    padding: 1.5rem 8.67rem;
    border-radius: 0.5rem;
    transition: all 0.2s;
    margin-bottom: 2rem;
    &:hover {
        background-color: var(--blue-two);
        cursor: pointer;
    }
`;
