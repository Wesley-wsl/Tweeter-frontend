import styled from "styled-components";

export const Container = styled.header`
    position: sticky;
    right: 0;
    left: 0;
    top: 0;
    background-color: ${({ theme }) => theme.background.thirdy};
    color: ${({ theme }) => theme.text.grey_200};
    display: flex;
    justify-content: space-between;
    padding: 0 5rem;
    height: 6rem;
    align-items: center;
    z-index: 99;

    border-bottom: 0.1rem solid ${({ theme }) => theme.border.primary};

    img {
        cursor: pointer;
    }

    nav > ul {
        display: flex;
        gap: 8rem;
        list-style: none;

        li {
            cursor: pointer;
            position: relative;
            padding: 1rem 0;
        }
    }

    nav > ul > li {
        &:hover {
            transition: all 0.2s linear;
            a {
                color: ${({ theme }) => theme.text.grey_200};
            }

            &::after {
                content: "";
                position: absolute;
                bottom: -0.9rem;
                left: -7.5%;
                right: 0;
                width: 115%;
                height: 0.3rem;
                background-color: ${({ theme }) => theme.button.primary};
                opacity: 0.5;
                border-radius: 0.8rem;
            }
        }

        a {
            text-decoration: none;
            color: ${({ theme }) => theme.text.header};
            font-size: var(--x-small);
            font-weight: 500;
        }
    }

    .active {
        color: ${({ theme }) => theme.button.primary};
        &::after {
            content: "";
            position: absolute;
            bottom: -0.9rem;
            left: -7.5%;
            right: 0;
            width: 115%;
            height: 0.3rem;
            background-color: ${({ theme }) => theme.button.primary};
            border-radius: 0.8rem;
        }
    }
`;
