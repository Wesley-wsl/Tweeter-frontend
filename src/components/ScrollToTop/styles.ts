import styled from "styled-components";

export const Container = styled.div`
    position: fixed;
    bottom: 3rem;
    right: 3rem;
    cursor: pointer;
    color: ${({ theme }) => theme.text.primary};
`;
