import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;

    image {
        cursor: pointer;
        margin-right: 1rem;
    }

    div {
        display: flex;
        width: 100%;

        textarea {
            padding: 1.3rem;
            width: 97%;
            padding-right: 3rem;
            background-color: ${({ theme }) => theme.background.textArea};
            border-bottom: 1rem;
            margin-left: 2rem;
            margin-right: 2rem;
            resize: vertical;
            height: 5rem;
            max-height: 8rem;
            border-radius: 1rem;
            color: ${({ theme }) => theme.text.primary};
        }

        button {
            background-color: ${({ theme }) => theme.button.thirdy};
            border-radius: 1rem;
            width: 7rem;
            height: 5rem;
            cursor: pointer;
            opacity: 0.6;
            transition: all 0.2s linear;

            &:hover {
                opacity: 1;
            }
        }
    }
`;
