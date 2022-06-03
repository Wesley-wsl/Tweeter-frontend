import React from "react";

import { IFilterTweets } from "../../@types";
import * as S from "./styles";

const FilterTweets: React.FC<IFilterTweets> = ({
    filter,
    handleFilter,
    options,
}) => {
    return (
        <S.Container>
            {options &&
                options.map((element, index) => (
                    <li
                        className={`${
                            filter === element ||
                            (options[0] === element && filter === "")
                                ? "active"
                                : ""
                        }`}
                        onClick={() => handleFilter(element)}
                        key={index}
                    >
                        {element.replace(/(^\w{1})|(\s+\w{1})/g, letter =>
                            letter.toUpperCase(),
                        )}
                    </li>
                ))}
        </S.Container>
    );
};

export default FilterTweets;
