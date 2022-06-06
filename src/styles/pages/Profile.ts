import styled from "styled-components";

export const Container = styled.main`
    background-color: var(--background-color-two);
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
`;
