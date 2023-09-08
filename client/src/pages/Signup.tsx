import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from "@mantine/core";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm, hasLength, matches, isEmail } from "@mantine/form";
import { server } from "../api/fetch";
import { useState } from "react";

export default function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const form = useForm({
    initialValues: {
      userName: "",
      password: "",
      email: "",
      passwordConfirmation: "",
    },

    validate: {
      userName: hasLength(
        { min: 5, max: 15 },
        "Name must be 5-15 characters long"
      ),
      email: isEmail(),
      password:
        hasLength({ min: 8, max: 20 }, "Password must be 8-20 char") &&
        matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "8-20 characters, include at least 1 letter, 1 number, and 1 special character"
        ),
      passwordConfirmation: (value, values) => {
        return value !== values.password ? "Passwords did not match" : null;
      },
    },
  });

  return (
    <Container size={420} my={40}>
      <form
        onSubmit={form.onSubmit(async (data) => {
          server
            .post("/auth/signup", data)
            .then(async (res) => {
              if (res) {
                navigate("/");
              }
            })
            .catch((err) => {
              console.log(err)
              setError(err.response.data.message);
            });
        })}
      >
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Welcome to Signup!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Already have an account?{" "}
          <NavLink to={"/"}>
            <Anchor size="sm" component="button">
              Login now
            </Anchor>
          </NavLink>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="Your Email"
            {...form.getInputProps("email")}
          />
          <TextInput
            label="Username"
            placeholder="Your Username"
            mt="md"
            {...form.getInputProps("userName")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            {...form.getInputProps("password")}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Your password"
            mt="md"
            {...form.getInputProps("passwordConfirmation")}
          />
          <Button type="submit" color="cyan" fullWidth mt="xl">
            Sign up
          </Button>
          {error.length >= 0 ? (
            <Text color="red" align="right" mt={5} fz={"sm"}>
              {error}
            </Text>
          ) : (
            <></>
          )}
        </Paper>
      </form>
    </Container>
  );
}
