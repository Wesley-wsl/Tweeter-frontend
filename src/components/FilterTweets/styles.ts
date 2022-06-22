import styled from "styled-components";

export const Container = styled.ul`
    position: sticky;
    right: 0;
    left: 0;
    top: 7rem;
    background-color: ${({ theme }) => theme.background.container};
    width: 20rem;
    height: 21rem;
    display: flex;
    flex-direction: column;
    font-size: 1.4rem;
    font-weight: 600;
    list-style: none;
    justify-content: space-around;
    margin-right: 2.4rem;
    border-radius: 1.6rem;
    border: 0.1rem solid ${({ theme }) => theme.border.primary};

    li {
        color: ${({ theme }) => theme.text.grey_300};
        margin-left: 2rem;
        cursor: pointer;
        max-width: fit-content;

        &.active {
            color: ${({ theme }) => theme.button.primary};
            position: relative;

            &::before {
                content: "";
                width: 0.3rem;
                height: 3.2rem;
                background-color: ${({ theme }) => theme.button.primary};
                position: absolute;
                left: -2rem;
                top: -0.5rem;
                border-radius: 0.8rem;
            }
        }
    }

    @media (max-width: 850px) {
        position: static;
        flex-direction: row;
        width: 100%;
        margin-bottom: 3.5rem;

        li {
            padding: 2rem;

            &.active {
                &::before {
                    width: 100%;
                    height: 0.3rem;
                    left: 0;
                    right: 0;
                    top: auto;
                    bottom: 0;
                }
            }
        }
    }

    @media (max-width: 410px) {
        flex-direction: column;

        li {
            padding: 2rem 0;

            &.active {
                &::before {
                    width: 0.3rem;
                    height: 3.2rem;
                    left: -2rem;
                    top: 1.5rem;
                    border-radius: 0.8rem;
                }
            }
        }
    }
`;
