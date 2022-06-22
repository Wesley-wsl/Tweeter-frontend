import styled from "styled-components";

export const Container = styled.main`
    background-color: ${({ theme }) => theme.background.secondary};
    min-height: 90vh;
`;

export const Tweets = styled.section`
    margin: 7rem auto;
    max-width: 100rem;
    display: flex;

    ul {
        flex: 0.7;
    }

    div {
        flex: 2;
    }

    @media (max-width: 1040px) {
        margin-right: 1.5rem;
        margin-left: 1.5rem;
    }

    @media (max-width: 850px) {
        flex-direction: column;
    }
`;
