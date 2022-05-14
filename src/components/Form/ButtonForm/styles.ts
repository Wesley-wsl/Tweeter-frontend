import styled from "styled-components";

export const Button = styled.button`
    width: 100%;
    font-size: var(--x-small);
    font-weight: 600;
    margin-top: 1rem;
    background-color: var(--blue-one);
    color: #fff;
    padding: 1.5rem 8.67rem;
    border-radius: 0.5rem;
    transition: all 0.2s;
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4.6rem;

    &:hover {
        background-color: var(--blue-two);
        cursor: pointer;
    }

    &:disabled {
        opacity: 0.5;
    }

    .loading {
        position: relative;
        width: 2rem;
        margin: 0 auto;
        height: 140%;
    }

    .loading div {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 2rem;
        height: 2rem;
        margin: 0.2rem;
        border: 0.2rem solid #fff;
        border-radius: 50%;
        animation: loading 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #fff transparent transparent transparent;
    }

    .loading div:nth-child(1) {
        animation-delay: -0.45s;
    }

    .loading div:nth-child(2) {
        animation-delay: -0.3s;
    }

    .loading div:nth-child(3) {
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
