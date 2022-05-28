import styled from "styled-components";

export const Container = styled.div`
    margin: 0 2rem 2rem 2rem;
    padding-top: 2rem;
    border-top: 0.1rem solid var(--grey-four);

    > div {
        display: flex;
        justify-content: space-between;
    }

    > p {
        font-weight: 500;
        font-family: var(--font-NotoSans);
        color: var(--grey-three);
        font-size: 1.4rem;
    }
`;

export const TopCard = styled.div`
    display: flex;

    > span {
        margin-right: -5rem;
        button {
            font-size: 1.2rem;
            width: 7.9rem;
            height: 2.4rem;
            margin-right: 0;
            margin-left: 0;
        }
    }

    div {
        display: flex;
        color: var(--grey-one);
        font-weight: 500;
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
        cursor: pointer;

        > span {
            border-radius: 0.5rem;
            width: 4rem;
            height: 4rem;
            margin-right: 1.4rem;

            img {
                border-radius: 0.5rem;
            }
        }

        div {
            display: flex;
            flex-direction: column;

            p:nth-child(1) {
                font-size: 1.6rem;
                font-weight: 500;
                color: #000;
            }

            p:nth-child(2) {
                font-weight: 500;
                font-size: 1.2rem;
                font-family: var(--font-NotoSans);
                color: var(--grey-three);
            }
        }
    }
`;
