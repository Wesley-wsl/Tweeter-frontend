import styled from "styled-components";

export const Container = styled.div`
    background-color: ${({ theme }) => theme.background.secondary};
    min-height: 90vh;
    margin: 2rem auto 7rem auto;
    max-width: 110rem;
    display: flex;
`;

export const Tweets = styled.section`
    flex: 2;
`;

export const Aside = styled.section`
    flex: 1;
    margin-left: 2rem;
`;
