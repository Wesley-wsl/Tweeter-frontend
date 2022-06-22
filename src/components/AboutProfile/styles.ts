import styled from "styled-components";

export const Container = styled.section`
    display: flex;
    background-color: ${({ theme }) => theme.background.container};
    max-width: 100rem;
    height: 15rem;
    margin: -5rem auto;
    border-radius: 1.2rem;
    border: 0.1rem solid ${({ theme }) => theme.border.primary};
    position: relative;

    @media (max-width: 1040px) {
        margin-right: 1.5rem;
        margin-left: 1.5rem;
    }

    @media (max-width: 700px) {
        display: flex;
        flex-direction: column;
        height: 28rem;
    }
`;

export const Informations = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1.5rem;
    gap: 1.5rem;
    width: 100%;

    > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        button {
            margin-left: 5rem;
            margin-right: 5rem;
        }
    }

    .top-informations {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 50%;

        h2 {
            font-size: 2.4rem;
            font-weight: 600;
            color: ${({ theme }) => theme.text.grey_100};
        }

        > p {
            font-size: 1.2rem;
            font-weight: 500;
            color: ${({ theme }) => theme.text.grey_300};
            cursor: pointer;

            span {
                font-size: 1.2rem;
                font-weight: 600;
                color: ${({ theme }) => theme.text.grey_100};
            }
        }
    }

    @media (max-width: 700px) {
        > div {
            display: flex;
            flex-direction: column;
            gap: 0.7rem;

            > div {
                display: flex;
                flex-direction: row;
            }
        }

        .top-informations {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            margin-top: -1rem;
        }
    }
`;

export const Description = styled.textarea`
    font-size: 1.7rem;
    background-color: ${({ theme }) => theme.background.container};
    font-family: ${({ theme }) => theme.fonts.secondary};
    font-weight: 500;
    color: ${({ theme }) => theme.text.grey_300};
    max-width: 50rem;
    resize: none;
    border: 0.1rem solid transparent;
    margin: -0.7rem;
    padding: 0.7rem;
    transition-property: border, border-radius, outline;
    transition-duration: 0.2s;
    transition-timing-function: linear;

    &:focus {
        outline: none;
        border: 0.1rem solid ${({ theme }) => theme.text.grey_400};
        border-radius: 0.8rem;
    }

    @media (max-width: 840px) {
        width: 80%;
    }

    @media (max-width: 700px) {
        margin: 0 auto;
    }
`;
