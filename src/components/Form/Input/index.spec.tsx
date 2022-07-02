import { PersonFill } from "@styled-icons/bootstrap";
import { FieldError } from "react-hook-form";

import Input from ".";
import { render, screen } from "../../../tests/mocks/setupProviders";

describe("#InputForm component", () => {
    test("Should be able to render iconRight", () => {
        render(
            <Input
                type="email"
                autoComplete="email"
                placeholder="Email"
                IconRight={
                    <PersonFill
                        width="20"
                        color={"#2F80ED"}
                        aria-label="Person Icon"
                        className="formIcon"
                    />
                }
            />,
        );

        const iconRight = screen.getByPlaceholderText("Email");

        expect(iconRight).toBeInTheDocument();
    });

    test("Should be able to render a custom error", () => {
        render(
            <Input
                type="email"
                autoComplete="email"
                placeholder="Email"
                error={{ message: "Some error." } as FieldError | undefined}
                IconRight={
                    <PersonFill
                        width="20"
                        color={"#2F80ED"}
                        aria-label="Person Icon"
                        className="formIcon"
                    />
                }
            />,
        );

        const error = screen.getByText("Some error.");
        expect(error).toBeInTheDocument();
    });
});
