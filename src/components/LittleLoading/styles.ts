import styled from "styled-components";

export const Container = styled.div`
    position: relative;
    width: 2rem;
    margin: 0 auto;
    height: 140%;

    div {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 2rem;
        height: 2rem;
        margin: 0.2rem;
        border: 0.2rem solid ${({ theme }) => theme.text.primary};
        border-radius: 50%;
        animation: loading 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: ${({ theme }) => theme.text.primary} transparent
            transparent transparent;
    }

    div:nth-child(1) {
        animation-delay: -0.45s;
    }

    div:nth-child(2) {
        animation-delay: -0.3s;
    }

    div:nth-child(3) {
        animation-delay: -0.15s;
    }

    @keyframes loading {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;
