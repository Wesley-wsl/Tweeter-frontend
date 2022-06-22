import styled from "styled-components";

export const Container = styled.div`
    position: relative;

    > p {
        font-weight: 500;
        font-family: ${({ theme }) => theme.fonts.secondary};
        font-size: 1.2rem;
        color: ${({ theme }) => theme.button.primary};
        cursor: pointer;
    }
`;

export const WhoCanSeeOptions = styled.div`
    position: absolute;
    top: 2.5rem;
    left: 0;
    width: 24.4rem;
    min-height: 15rem;
    padding: 1.5rem;
    background-color: ${({ theme }) => theme.background.container};
    border-radius: 1rem;
    border: 0.1rem solid ${({ theme }) => theme.border.primary};
    z-index: 3;

    > p {
        margin-bottom: 0.2rem;
        font-size: 1.2rem;
    }

    > p:nth-child(1) {
        font-weight: 600;
        color: ${({ theme }) => theme.text.grey_200};
    }

    > p:nth-child(2) {
        font-weight: 400;
        color: ${({ theme }) => theme.text.grey_300};
    }

    li {
        display: flex;
        align-items: center;
        padding: 1rem 0.2rem;
        border-radius: 1rem;
        transition: all 0.2s linear;
        cursor: pointer;
        font-size: 1.2rem;
        font-weight: 500;
        font-family: ${({ theme }) => theme.fonts.secondary};
        color: ${({ theme }) => theme.text.grey_200};

        svg {
            color: ${({ theme }) => theme.svg.primary};
        }

        &:hover {
            background-color: ${({ theme }) => theme.background.secondary};
        }

        svg {
            margin-right: 1rem;
        }
    }

    @media (max-width: 450px) {
        margin-left: -8rem;
        width: 22rem;
    }
`;
