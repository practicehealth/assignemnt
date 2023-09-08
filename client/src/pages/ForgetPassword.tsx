import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Group,
  Anchor,
} from "@mantine/core";
import { useForm, hasLength, matches } from "@mantine/form";
import { NavLink, useNavigate } from "react-router-dom";
import { server } from "../api/fetch";
import { useState } from "react";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const form = useForm({
    initialValues: {
      userName: "",
      password: "",
      newPassword: "",
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
      newPassword:
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
            .post("/auth/forgetPassword", data)
            .then(async (res) => {
              if (res) {
                navigate("/");
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
          Forget Password!
        </Title>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Username"
            placeholder="Your Username"
            {...form.getInputProps("userName")}
          />
          <PasswordInput
            label="Old Password"
            placeholder="Your password"
            mt="md"
            {...form.getInputProps("password")}
          />
          <PasswordInput
            label="New Password"
            placeholder="Your password"
            mt="md"
            {...form.getInputProps("newPassword")}
          />

          <Button type="submit" color="cyan" fullWidth mt="xl">
            Submit
          </Button>
          {error.length >= 0 ? (
            <Text color="red" align="right" mt={5} fz={"sm"}>
              {error}
            </Text>
          ) : (
            <></>
          )}
          <Group position="right" mt="lg">
            <NavLink to={"/"}>
              <Anchor component="button" size="sm" >
                Back to Login
              </Anchor>
            </NavLink>
          </Group>
        </Paper>
      </form>
    </Container>
  );
}
