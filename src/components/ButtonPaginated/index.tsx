import React from "react";

import { IButtonPaginated } from "../../@types";
import { Container } from "./styles";

const ButtonPaginated: React.FC<IButtonPaginated> = ({
    error,
    size,
    setSize,
}) => {
    return (
        <>
            {error ? (
                ""
            ) : (
                <Container onClick={() => setSize(size + 1)}>
                    Load more
                </Container>
            )}
        </>
    );
};

export default ButtonPaginated;
