import { render, screen } from "@testing-library/react";
import CenteredLoading from "./CenteredLoading";

describe(CenteredLoading, () => {
  test("CenteredLoading renders a circular progress spinner", () => {
    render(<CenteredLoading />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("CenteredLoading matches snapshot", () => {
    const { asFragment } = render(<CenteredLoading />);
    expect(asFragment()).toMatchSnapshot();
  });
});
