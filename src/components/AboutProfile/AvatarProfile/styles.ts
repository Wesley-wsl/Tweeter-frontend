import styled from "styled-components";

export const Container = styled.div`
    border-radius: 0.8rem;
    margin-top: -3rem;
    margin-left: 2rem;
    margin-right: 2rem;
    padding: 0.4rem;
    background-color: ${({ theme }) => theme.background.thirdy};
    position: relative;
    img {
        border-radius: 0.8rem;
        filter: contrast(120%);
    }

    .changeImage {
        transition: all 0.2s linear;
        position: absolute;
        cursor: pointer;
        top: 0.5rem;
        right: 0.5rem;
        left: 0.5rem;
        bottom: 4.2rem;
        border-radius: 0.8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #0008;
        svg {
            z-index: 9999;
            cursor: pointer;
        }
        opacity: 0;

        &:hover {
            opacity: 1;
        }
    }

    @media (max-width: 700px) {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        width: 10rem;
        height: 10rem;
        margin-top: -5rem;

        .changeImage {
            bottom: 0.5rem;
        }
    }
`;
