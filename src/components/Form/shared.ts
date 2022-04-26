import styled from "styled-components";

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--background-color);
    padding: 4rem 5rem;
    border-radius: 2rem;
    box-shadow: 0rem 0rem 1rem var(--blue-one);
    height: 43rem;
    margin: auto;
    justify-content: space-between;

    p > a {
        margin-top: 2rem;
        font-size: var(--x-small);
        font-weight: 400;
        color: var(--blue-one);
        font-family: var(--font-NotoSans);
    }
`;
