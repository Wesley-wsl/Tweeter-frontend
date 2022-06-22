import styled from "styled-components";

export const Container = styled.div`
    background-color: ${({ theme }) => theme.background.container};
    margin-bottom: 2rem;
    padding: 2rem;
    border-radius: 2.5rem;
    border: 0.1rem solid ${({ theme }) => theme.border.primary};

    > p:nth-child(1) {
        border-bottom: 0.1rem solid ${({ theme }) => theme.border.primary};
        color: ${({ theme }) => theme.text.grey_200};
        font-weight: 600;
        font-size: 1.2rem;
        padding-bottom: 1rem;
    }
`;

export const WhoFollow = styled.div`
    display: flex;
    flex-direction: column;
    border-bottom: 0.1rem solid ${({ theme }) => theme.border.primary};

    > p {
        color: ${({ theme }) => theme.text.grey_200};
        font-weight: 600;
        font-size: 1.2rem;
        padding-bottom: 1rem;
        margin: 1rem 0;
    }

    @media (max-width: 850px) {
        > div {
            margin: 0 auto;
        }
    }
`;
