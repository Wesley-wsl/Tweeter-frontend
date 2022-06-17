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
`;
