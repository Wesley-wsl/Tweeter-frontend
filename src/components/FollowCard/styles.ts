import styled from "styled-components";

export const Container = styled.div`
    margin: 0 2rem 2rem 2rem;
    padding-top: 2rem;
    border-top: 0.1rem solid ${({ theme }) => theme.text.grey_400};

    > div {
        display: flex;
        justify-content: space-between;
    }

    > p {
        font-weight: 500;
        font-family: ${({ theme }) => theme.fonts.secondary};
        color: ${({ theme }) => theme.text.grey_300};
        font-size: 1.4rem;
    }
`;

export const TopCard = styled.div`
    display: flex;

    > span {
        button {
            font-size: 1.2rem;
            width: 7.9rem;
            height: 2.7rem;
            margin-right: 0;
            margin-left: 0;
        }
    }

    div {
        display: flex;
        color: ${({ theme }) => theme.text.grey_100};
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
                color: ${({ theme }) => theme.text.primary};
            }

            p:nth-child(2) {
                font-weight: 500;
                font-size: 1.2rem;
                font-family: ${({ theme }) => theme.fonts.secondary};
                color: ${({ theme }) => theme.text.grey_300};
            }
        }
    }
`;
