import styled from "styled-components";

export const Container = styled.div`
    position: relative;

    input {
        padding: 1.5rem;
        width: 25rem;
        margin-bottom: 1.5rem;
        border-radius: 0.4rem;
        padding-right: 3.5rem;
        outline: none;
        transition: border 0.3s linear;
        border: 0.1rem solid transparent;
        border-bottom: 0.1rem solid var(--blue-one);

        &::placeholder {
            letter-spacing: 0.13rem;
            font-family: var(--font-NotoSans);
        }
        &:focus {
            border: 0.1rem solid var(--blue-one);
        }
    }

    .formIcon {
        position: absolute;
        top: 1.3rem;
        right: 0.7rem;
        cursor: pointer;
    }
`;
