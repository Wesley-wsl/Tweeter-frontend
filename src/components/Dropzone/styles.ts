import styled, { css } from "styled-components";

import { IDropzoneStyle } from "../../@types";

const dragActive = css`
    border-color: var(--blue-one);
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
    border: 0.1rem solid var(--border-one);
    background-color: #fff;
    border-radius: 1rem;

    .dropzone__container {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 0.1rem dashed var(--grey-one);
        width: 95%;
        height: 95%;
        margin: auto;

        ${props => props.isDragActive && dragActive}
        ${props => props.isDragReject && dragReject}
    }

    p {
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--grey-one);
    }

    .error {
        color: red;
        text-align: center;
    }
`;
