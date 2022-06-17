import styled from "styled-components";

export const Container = styled.div`
    width: 60rem;
    height: 50rem;
    border: 0.1rem solid ${({ theme }) => theme.border.primary};
    background-color: ${({ theme }) => theme.background.primary};
    border-radius: 1rem;
    overflow-y: scroll;
    overflow-x: hidden;
    border: 0;

    &::-webkit-scrollbar {
        width: 0.8rem;
    }

    &::-webkit-scrollbar-track {
        background: ${({ theme }) => theme.background.primary};
        border-radius: 3rem;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.background.input};
        border-radius: 3rem;
    }
`;

export const TopFollowList = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2rem 2rem 0.5rem 2rem;
    > p {
        font-weight: 600;
        font-size: 1.4rem;
        color: ${({ theme }) => theme.text.grey_100};
    }

    svg {
        cursor: pointer;
    }
`;

export const WithoutFollow = styled.p`
    font-weight: 600;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.text.grey_100};
    border-top: 0.1rem solid ${({ theme }) => theme.text.grey_400};
    margin: 0 2rem;
    width: 94%;
    padding-top: 1rem;
`;
