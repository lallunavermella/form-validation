import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

describe("Given a form component", () => {
  describe("When it is rendered", () => {
    test("Then it will render the text User", () => {
      render(<App />);

      const userInput = screen.getByLabelText("User");

      expect(userInput).toBeInTheDocument();

      fireEvent.change(userInput, { target: { value: "testuser" } });
      expect(userInput.value).toBe("testuser");
    });

    test("Then if only change one input the button are disable", () => {
      render(<App />);

      const userInput = screen.getByLabelText("User");
      const signInButton = screen.getByText("Sign in");

      expect(userInput).toBeInTheDocument();
      expect(signInButton).toBeInTheDocument();
      expect(signInButton).toBeDisabled();
    });
    test("Then the password is worng appear a error text", () => {
      render(<App />);

      const passwordInput = screen.getByLabelText("Password");

      expect(passwordInput).toBeInTheDocument();

      fireEvent.change(passwordInput, { target: { value: "Test123" } });
      expect(passwordInput.value).toBe("Test123");
      const noErrorMessage = screen.queryByText(
        "You need a password with 6 characters and a capital letter"
      );

      expect(noErrorMessage).not.toBeInTheDocument();

      fireEvent.change(passwordInput, { target: { value: "errortest" } });
      expect(passwordInput.value).toBe("errortest");

      const passwordErrorMessage = screen.queryByText(
        "You need a password with 6 characters and a capital letter"
      );
      expect(passwordErrorMessage).toBeInTheDocument();
    });

    test("It will render City and email input only when the User and Password input are completed", () => {
      render(<App />);
      const userInput = screen.getByLabelText("User");
      const passwordInput = screen.getByLabelText("Password");
      const cityInput = screen.queryByLabelText("City");
      const emailInput = screen.queryByLabelText("Email address");

      expect(userInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(cityInput).toBeNull();
      expect(emailInput).toBeNull();

      fireEvent.change(userInput, { target: { value: "testuser" } });
      fireEvent.change(passwordInput, { target: { value: "Test123" } });

      expect(screen.getByLabelText("City")).toBeInTheDocument();
      expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    });

    test("When all inputs are completed the button are not dissabled", async () => {
      render(<App />);

      const userInput = screen.getByLabelText("User");
      fireEvent.change(userInput, { target: { value: "testusert" } });

      const passwordInput = screen.getByLabelText("Password");
      fireEvent.change(passwordInput, { target: { value: "Test13" } });

      const cityInput = screen.getByLabelText("City");
      fireEvent.change(cityInput, { target: { value: "CityTest" } });

      const emailInput = screen.getByLabelText("Email address");
      fireEvent.change(emailInput, { target: { value: "email@test.com" } });

      expect(userInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(cityInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();

      const signInButton = screen.getByRole("button");
      expect(signInButton).not.toBeDisabled();
    });
  });
});
