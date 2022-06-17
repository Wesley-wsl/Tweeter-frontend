import styled from "styled-components";

export const Container = styled.section`
    display: flex;
    background-color: ${({ theme }) => theme.background.container};
    max-width: 100rem;
    height: 15rem;
    margin: -5rem auto;
    border-radius: 1.2rem;
    border: 0.1rem solid ${({ theme }) => theme.border.primary};
    position: relative;

    .avatar {
        border-radius: 0.8rem;
        margin-top: -3rem;
        margin-left: 2rem;
        margin-right: 2rem;
        padding: 0.4rem;
        background-color: ${({ theme }) => theme.border.thirdy};
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
            color: ${({ theme }) => theme.text.grey_100};
        }

        > p {
            font-size: 1.2rem;
            font-weight: 500;
            color: ${({ theme }) => theme.text.grey_300};
            cursor: pointer;

            span {
                font-size: 1.2rem;
                font-weight: 600;
                color: ${({ theme }) => theme.text.grey_100};
            }
        }
    }
`;

export const Description = styled.textarea`
    font-size: 1.7rem;
    background-color: ${({ theme }) => theme.background.container};
    font-family: ${({ theme }) => theme.fonts.secondary};
    font-weight: 500;
    color: ${({ theme }) => theme.text.grey_300};
    max-width: 50rem;
    resize: none;
    border: 0.1rem solid transparent;
    margin: -0.7rem;
    padding: 0.7rem;
    transition-property: border, border-radius, outline;
    transition-duration: 0.2s;
    transition-timing-function: linear;

    &:focus {
        outline: none;
        border: 0.1rem solid ${({ theme }) => theme.text.grey_400};
        border-radius: 0.8rem;
    }
`;
