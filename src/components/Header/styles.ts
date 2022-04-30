import styled from "styled-components";

export const Container = styled.header`
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 0 5rem;
    height: 6rem;
    align-items: center;

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

            a {
                text-decoration: none;
                color: var(--grey-two);
                font-size: var(--x-small);
                font-weight: 500;
            }
        }
    }

    .active {
        color: var(--blue-one);
        &::after {
            content: "";
            position: absolute;
            bottom: -0.9rem;
            left: -7.5%;
            right: 0;
            width: 115%;
            height: 0.3rem;
            background-color: var(--blue-one);
            border-radius: 0.8rem;
        }
    }

    div > p {
        font-size: var(--x-small);
    }

    div {
        display: flex;
        align-items: center;
        max-width: 13rem;
        cursor: pointer;

        div {
            background-color: #000;
            width: 3.2rem;
            height: 3.2rem;
            border-radius: 0.5rem;
            margin-right: 1rem;
        }

        p {
            margin-right: 1rem;
        }
    }
`;
