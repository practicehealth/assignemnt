import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useForm, hasLength, matches } from "@mantine/form";
import { NavLink, useNavigate } from "react-router-dom";
import { server } from "../api/fetch";
import { AuthContext } from "../context/AuthProvider";
import { useContext, useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [error, setError] = useState("");

  const form = useForm({
    initialValues: {
      userName: "",
      password: "",
    },

    validate: {
      userName: hasLength(
        { min: 5, max: 15 },
        "Name must be 5-15 characters long"
      ),
      password:
        hasLength({ min: 8, max: 20 }, "Password must be 8-20 char") &&
        matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "8-20 characters, include at least 1 letter, 1 number, and 1 special character"
        ),
    },
  });
  return (
    <Container size={420} my={40}>
      <form
        onSubmit={form.onSubmit(async (data) => {
          server
            .post("/auth/login", data)
            .then(async (res) => {
              if (res) {
                auth.dispatch({ type: "loading" });
                const { data } = await server.get("/auth/verify");
                auth.dispatch({ type: "login", payload: data.userInfo });
                navigate("/dashboard");
              }
            })
            .catch((err) => {
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
          Welcome to Signin!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{" "}
          <NavLink to={"/signup"}>
            <Anchor size="sm" component="button">
              Create account
            </Anchor>
          </NavLink>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Username"
            placeholder="Your Username"
            {...form.getInputProps("userName")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            {...form.getInputProps("password")}
          />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
            <NavLink to={"/forgetPassword"}>
              <Anchor component="button" size="sm">
                Forgot password?
              </Anchor>
            </NavLink>
          </Group>
          <Button type="submit" color="cyan" fullWidth mt="xl">
            Sign in
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
