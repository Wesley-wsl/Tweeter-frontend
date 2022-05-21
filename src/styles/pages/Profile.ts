import styled from "styled-components";

import { IImage } from "../../@types";

export const Container = styled.main`
    background-color: var(--background-color-two);
    min-height: 90vh;
`;

export const BackgroundProfile = styled.div<IImage>`
    background-color: black;
    display: flex;
    background-image: url(${({ image }) => image});
    background-size: cover;
    background-position: center center;
    height: 25rem;
`;

export const About = styled.section`
    display: flex;
    background-color: #fff;
    max-width: 100rem;
    height: 15rem;
    margin: -5rem auto;
    border-radius: 1.2rem;
    border: 0.1rem solid var(--border-one);

    .avatar {
        border-radius: 0.8rem;
        margin-top: -3rem;
        margin-left: 2rem;
        margin-right: 2rem;
        padding: 0.4rem;
        background-color: #ffff;
        img {
            border-radius: 0.8rem;
            filter: contrast(120%);
        }
    }
`;

export const Informations = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1.5rem;
    gap: 1.5rem;
    width: 100%;

    > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        button {
            margin-left: 5rem;
            margin-right: 5rem;
        }
    }

    .top-informations {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 50%;

        h2 {
            font-size: 2.4rem;
            font-weight: 600;
            color: var(--grey-one);
        }

        p {
            font-size: 1.2rem;
            font-weight: 500;
            color: var(--grey-three);

            span {
                font-size: 1.2rem;
                font-weight: 600;
                color: var(--grey-one);
            }
        }
    }
`;

export const Description = styled.p`
    font-size: 1.7rem;
    font-family: var(--font-NotoSans);
    font-weight: 500;
    color: var(--grey-three);
    max-width: 42.7rem;
`;

export const Tweets = styled.section`
    margin: 7rem auto;
    max-width: 100rem;
    display: flex;

    ul {
        flex: 0.7;
    }

    div {
        flex: 2;
    }
`;

export const TweetsFilterProfile = styled.ul`
    position: sticky;
    right: 0;
    left: 0;
    top: 3rem;
    background-color: #fff;
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
    border: 0.1rem solid var(--border-one);
    li {
        color: var(--grey-three);
        margin-left: 2rem;
        cursor: pointer;
        max-width: fit-content;

        &.active {
            color: var(--blue-one);
            position: relative;

            &::before {
                content: "";
                width: 0.3rem;
                height: 3.2rem;
                background-color: var(--blue-one);
                position: absolute;
                left: -2rem;
                top: -0.5rem;
                border-radius: 0.8rem;
            }
        }
    }
`;
