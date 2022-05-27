import styled from "styled-components";

export const Container = styled.div`
    width: 60rem;
    height: 50rem;
    border: 0.1rem solid var(--border-one);
    background-color: #fff;
    border-radius: 1rem;
    overflow-y: scroll;
    overflow-x: hidden;
    border: 0;

    &::-webkit-scrollbar {
        width: 0.8rem;
    }

    &::-webkit-scrollbar-track {
        background: var(--grey-four);
        border-radius: 3rem;
    }

    &::-webkit-scrollbar-thumb {
        background-color: var(--grey-three);
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
        color: var(--grey-one);
    }

    svg {
        cursor: pointer;
    }
`;

export const WithoutFollow = styled.p`
    font-weight: 600;
    font-size: 1.4rem;
    color: var(--grey-one);
    border-top: 0.1rem solid var(--grey-four);
    margin: 0 2rem;
    width: 94%;
    padding-top: 1rem;
`;
