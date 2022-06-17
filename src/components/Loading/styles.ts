import styled from "styled-components";

export interface ILoader {
    lightMode: boolean;
}

export const Loader = styled.div<ILoader>`
    background-color: ${({ theme }) => theme.background.secondary};
    width: 100vw;
    height: 100vh;
    position: absolute;

    &:before {
        transform: rotateX(60deg) rotateY(45deg) rotateZ(45deg);
        animation: 750ms rotateBefore infinite linear reverse;
    }

    &:after {
        transform: rotateX(240deg) rotateY(45deg) rotateZ(45deg);
        animation: 750ms rotateAfter infinite linear;
    }

    &:before,
    &:after {
        box-sizing: border-box;
        content: "";
        display: block;
        position: fixed;
        top: 50%;
        left: 50%;
        margin-top: -7.5em;
        margin-left: -7.5em;
        width: 15em;
        height: 15em;
        transform-style: preserve-3d;
        transform-origin: 50%;
        transform: rotateY(50%);
        perspective-origin: 50% 50%;
        perspective: 340px;
        background-size: 15em 15em;
        background-image: ${({ lightMode }) =>
            lightMode
                ? "url(/background/effectDark.svg)"
                : "url(/background/effectLight.svg)"};
    }

    @keyframes rotateBefore {
        from {
            transform: rotateX(60deg) rotateY(45deg) rotateZ(0deg);
        }
        to {
            transform: rotateX(60deg) rotateY(45deg) rotateZ(-360deg);
        }
    }

    @keyframes rotateAfter {
        from {
            transform: rotateX(240deg) rotateY(45deg) rotateZ(0deg);
        }
        to {
            transform: rotateX(240deg) rotateY(45deg) rotateZ(360deg);
        }
    }
`;
