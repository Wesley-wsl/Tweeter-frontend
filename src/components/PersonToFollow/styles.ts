import styled from "styled-components";

export const Container = styled.div`
    padding-bottom: 2rem;
    border-bottom: 0.1rem solid var(--grey-five);

    div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1rem;
        margin-bottom: 1rem;

        div {
            display: flex;
            align-items: center;

            div {
                display: flex;
                flex-direction: column;
                margin-left: 1.7rem;
            }

            p:nth-child(1) {
                font-size: 1.6rem;
                font-weight: 500;
            }

            p:nth-child(2) {
                font-size: 1.2rem;
                font-family: var(--font-NotoSans);
                color: var(--grey-three);
                font-weight: 500;
            }
        }

        button {
            width: 7.9rem;
            height: 2.6rem;
            font-size: 1.2rem;
            margin-left: 4rem;
        }
    }

    > p {
        color: #828282;
        font-weight: 500;
        font-size: 1.4rem;
        font-family: var(--font-NotoSans);
        margin-bottom: 2rem;
    }

    img {
        border-radius: 1rem;
    }
`;
