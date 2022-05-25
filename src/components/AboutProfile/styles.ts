import styled from "styled-components";

export const Container = styled.section`
    display: flex;
    background-color: #fff;
    max-width: 100rem;
    height: 15rem;
    margin: -5rem auto;
    border-radius: 1.2rem;
    border: 0.1rem solid var(--border-one);
    position: relative;

    .avatar {
        border-radius: 0.8rem;
        margin-top: -3rem;
        margin-left: 2rem;
        margin-right: 2rem;
        padding: 0.4rem;
        background-color: #ffff;
        position: relative;
        img {
            border-radius: 0.8rem;
            filter: contrast(120%);
        }

        .changeImage {
            transition: all 0.2s linear;
            position: absolute;
            cursor: pointer;
            top: 0.5rem;
            right: 0.5rem;
            left: 0.5rem;
            bottom: 4.2rem;
            border-radius: 0.8rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #0008;
            svg {
                z-index: 9999;
                cursor: pointer;
            }
            opacity: 0;

            &:hover {
                opacity: 1;
            }
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

export const Description = styled.textarea`
    font-size: 1.7rem;
    font-family: var(--font-NotoSans);
    font-weight: 500;
    color: var(--grey-three);
    max-width: 50rem;
    resize: none;
    border: 0.1rem solid transparent;
    margin: -0.7rem;
    padding: 0.7rem;
    transition: all 0.2s linear;

    &:focus {
        outline: none;
        box-shadow: 0rem 0rem 0.1rem 0.1rem var(--border-one);
        border: 0.1rem solid var(--border-one);
        border-radius: 0.8rem;
    }
`;
