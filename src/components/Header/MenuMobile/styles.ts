import styled from "styled-components";

export const ToggleMenu = styled.button`
    position: fixed;
    top: 1.2rem;
    left: 5rem;
    width: 3.5rem;
    height: 3.5rem;
    background-color: ${({ theme }) => theme.background.primary};
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 0.4rem;
    color: ${({ theme }) => theme.text.primary};

    @media (min-width: 770px) {
        display: none;
    }
`;

export const NavigationMobile = styled.ul`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 30rem;
    background-color: ${({ theme }) => theme.background.container};
    z-index: 99;
    padding: 10rem 0 0 5rem;
    display: flex;
    list-style: none;
    flex-direction: column;
    border-right: 1px solid ${({ theme }) => theme.border.primary};

    li {
        padding: 1rem 0;
        font-size: 2rem;
        margin-bottom: 1rem;
        width: fit-content;
        user-select: none;
        color: ${({ theme }) => theme.text.grey_400};
    }

    a {
        color: ${({ theme }) => theme.text.primary};
        text-decoration: none;
    }

    .active {
        position: relative;
        color: ${({ theme }) => theme.button.primary};
        &::after {
            content: "";
            position: absolute;
            bottom: -0.9rem;
            left: -7.5%;
            right: 0;
            width: 112%;
            height: 0.3rem;
            background-color: ${({ theme }) => theme.button.primary};
            border-radius: 0.8rem;
        }
        z-index: 999;
    }

    @media (min-width: 770px) {
        display: none;
    }
`;

export const OverlayMobile = styled.div`
    background-color: #0008;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 97;
    backdrop-filter: blur(0.2rem);

    @media (min-width: 770px) {
        display: none;
    }
`;
