import { TextInput, PasswordInput, Anchor, Paper, Title, Text, Container, Group, Button, } from '@mantine/core';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Login-styles.scss"
import { useMyContext } from '../context/mainContext';
const Login = () => {
    interface userData {
        email: String,
        password: String,
    }
    const navigate = useNavigate();
    const { loginUser } = useMyContext();
    const [email, setEmail] = useState<String>('');
    const [password, setPassword] = useState<String>('');
    const formData: userData = {
        email,
        password
    }
    const onSubmitHandler = () => {
        (async function () {
            const isTrue: any = await loginUser(formData);
            if (isTrue) {
                navigate("/")
            }
        })()
    }
    return (
        <div className="signupContainer">
            <Container size={420} my={40}>
                <Title
                    align="center"
                    sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
                >
                    Login into your account
                </Title>
                <Text color="dimmed" size="sm" align="center" mt={5}>
                    Do not have an account yet?{' '}
                    <Link to="/signup">
                        <Anchor size="sm" component="button">
                            Create account
                        </Anchor></Link>
                </Text>

                <form onSubmit={onSubmitHandler}>
                    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                        <TextInput onChange={(e) => setEmail(e.target.value)} label="Email" placeholder="spotlight@example.com" required />
                        <PasswordInput onChange={(e) => setPassword(e.target.value)} label="Password" placeholder="Your password" required mt="md" />
                        <Group position="apart" mt="lg">
                            <Link to="/forgotPassword">
                                <Anchor component="button" size="sm">
                                    Forgot password?
                                </Anchor></Link>
                        </Group>
                        <Button onClick={onSubmitHandler} fullWidth mt="xl">
                            Login now !
                        </Button>
                    </Paper>
                </form>
            </Container>
        </div>
    );
}


export default Login