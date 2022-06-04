import styled from "styled-components";

export const Container = styled.div`
    position: relative;

    > p {
        font-weight: 500;
        font-family: var(--font-NotoSans);
        font-size: 1.2rem;
        color: var(--blue-one);
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
    background-color: #fff;
    border-radius: 1rem;
    border: 0.1rem solid var(--border-one);
    z-index: 3;

    > p {
        margin-bottom: 0.2rem;
        font-size: 1.2rem;
    }

    > p:nth-child(1) {
        font-weight: 600;
        color: var(--grey-two);
    }

    > p:nth-child(2) {
        font-weight: 400;
        color: var(--grey-three);
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
        font-family: var(--font-NotoSans);

        &:hover {
            background-color: var(--background-color-two);
        }

        svg {
            margin-right: 1rem;
        }
    }
`;
