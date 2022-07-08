import { useContext } from "react";

import { ThemeContext } from "../../contexts/Theme";
import * as S from "./styles";

export const Loading: React.FC = () => {
    const { lightMode } = useContext(ThemeContext);

    return <S.Loader lightMode={lightMode} data-testid="loading" />;
};
