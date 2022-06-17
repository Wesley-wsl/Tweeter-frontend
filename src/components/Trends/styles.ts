import styled from "styled-components";

export const Container = styled.div`
    background-color: ${({ theme }) => theme.background.container};
    margin-bottom: 2rem;
    padding: 2rem 2rem 2rem 2rem;
    border-radius: 2.5rem;
    border: 0.1rem solid ${({ theme }) => theme.border.primary};

    > p {
        margin-bottom: 1rem;
        border-bottom: 0.1rem solid ${({ theme }) => theme.border.primary};
        color: ${({ theme }) => theme.text.grey_200};
        font-weight: 600;
        font-size: 1.2rem;
        padding-bottom: 1rem;
    }

    > div {
        cursor: pointer;
        margin-bottom: 2rem;
        width: fit-content;
        position: relative;

        p {
            color: ${({ theme }) => theme.text.grey_200};
        }

        p:nth-child(1) {
            font-size: 1.6rem;
            font-weight: 600;
            font-family: ${({ theme }) => theme.fonts.secondary};
            margin-bottom: 0.8rem;
        }

        p:nth-child(2) {
            font-family: ${({ theme }) => theme.fonts.secondary};
            font-weight: 500;
            font-size: 1.2rem;
            margin-bottom: 2.4rem;
        }
    }

    > div:nth-last-child(1) > p:nth-last-child(1) {
        margin-bottom: 0;
    }

    .trendActive > p {
        color: ${({ theme }) => theme.text.primary};
    }
`;

export const LoadingContainer = styled.div`
    margin: 0 auto;
    opacity: 0.7;
`;

export const CloseTrend = styled.div`
    color: red;
    position: absolute;
    top: 0;
    right: -2rem;
    opacity: 0.5;
`;
