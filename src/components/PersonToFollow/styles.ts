import styled from "styled-components";

export const Container = styled.div`
    padding-bottom: 2rem;
    border-bottom: 0.1rem solid ${({ theme }) => theme.border.primary};

    div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1rem;
        margin-bottom: 1rem;

        div {
            display: flex;
            align-items: center;
            cursor: pointer;

            div {
                display: flex;
                flex-direction: column;
                margin-left: 1.7rem;
            }

            p:nth-child(1) {
                color: ${({ theme }) => theme.text.primary};
                font-size: 1.6rem;
                font-weight: 500;
            }

            p:nth-child(2) {
                font-size: 1.2rem;
                font-family: ${({ theme }) => theme.fonts.secondary};
                color: ${({ theme }) => theme.text.grey_300};
                font-weight: 500;
            }
        }

        button {
            width: 7.9rem;
            height: 2.9rem;
            font-size: 1.2rem;
            margin-left: 4rem;
        }
    }

    > p {
        color: ${({ theme }) => theme.text.grey_200};
        font-weight: 500;
        font-size: 1.4rem;
        font-family: ${({ theme }) => theme.fonts.secondary};
        margin-bottom: 2rem;
    }

    img {
        border-radius: 1rem;
    }
`;
