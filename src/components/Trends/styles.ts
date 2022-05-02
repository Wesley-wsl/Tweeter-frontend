import styled from "styled-components";

export const Container = styled.div`
    background-color: #fff;
    margin-bottom: 2rem;
    padding: 2rem;
    border-radius: 2.5rem;

    > p {
        margin-bottom: 1rem;
        border-bottom: 0.1rem solid var(--grey-five);
        color: var(--grey-two);
        font-weight: 600;
        font-size: 1.2rem;
        padding-bottom: 1rem;
    }

    div {
        p:nth-child(1) {
            font-size: 1.6rem;
            font-weight: 600;
            font-family: var(--font-NotoSans);
            color: var(--grey-one);
            margin-bottom: 0.8rem;
        }

        p:nth-child(2) {
            color: var(--grey-three);
            font-family: var(--font-NotoSans);
            font-size: 1.2rem;
            margin-bottom: 2.4rem;
        }
    }
`;
