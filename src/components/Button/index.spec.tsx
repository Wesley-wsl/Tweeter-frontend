import { PersonAdd } from "@styled-icons/ionicons-sharp";

import { Button } from ".";
import { render, screen } from "../../tests/mocks/setupProviders";

describe("#Button component.", () => {
    test("Should be able to render all informations passed by attributes.", () => {
        render(
            <Button
                color="#000"
                title="Follow"
                disabled={false}
                type="submit"
            />,
        );

        const button = screen.getByRole("button", {
            name: "Follow",
        }) as HTMLButtonElement;

        expect(button.getAttribute("color")).toEqual("#000");
    });

    test("Should be able to render a svg passed by attribute.", () => {
        render(
            <Button
                color="#000"
                title="Follow"
                disabled={false}
                type="submit"
                iconLeft={
                    <PersonAdd
                        width={12}
                        height={12}
                        aria-label="Person add icon"
                    />
                }
            />,
        );

        const icon = screen.getByLabelText("Person add icon");
        expect(icon).toBeInTheDocument();
    });

    test("Should render a diferent style if button are disabled.", () => {
        render(
            <Button
                color="#000"
                title="Follow"
                disabled={true}
                type="submit"
            />,
        );

        const button = screen.getByRole("button", { name: "Follow" });

        expect(button).toBeDisabled();
        expect(button).toHaveStyle(`opacity: 0.6`);
    });
});
