import styled, { css } from "styled-components";

import { IDropzoneStyle } from "../../@types";

const dragActive = css`
    border-color: ${({ theme }) => theme.button.primary};
`;

const dragReject = css`
    border-color: red;
`;

export const Container = styled.div<IDropzoneStyle>`
    display: flex;
    justify-content: center;
    cursor: pointer;
    position: relative;
    width: 50rem;
    height: 40rem;
    border: 0.1rem solid ${({ theme }) => theme.border.primary};
    background-color: ${({ theme }) => theme.background.primary};
    border-radius: 1rem;

    .dropzone__container {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 0.1rem dashed ${({ theme }) => theme.text.grey_100};
        width: 95%;
        height: 95%;
        margin: auto;

        ${props => props.isDragActive && dragActive}
        ${props => props.isDragReject && dragReject}
    }

    p {
        font-size: 1.5rem;
        font-weight: bold;
        color: ${({ theme }) => theme.text.grey_100};
    }

    .error {
        color: red;
        text-align: center;
    }
`;
