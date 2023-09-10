import { createStyles, Paper, Title, Text, TextInput, Button, Container, Group, Anchor, Center, Box, rem } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useState } from "react"
import "../styles/Forgot-styles.scss"
import { useMyContext } from '../context/mainContext';

const useStyles = createStyles((theme) => ({
    title: {
        fontSize: rem(26),
        fontWeight: 900,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    controls: {
        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column-reverse',
        },
    },

    control: {
        [theme.fn.smallerThan('xs')]: {
            width: '100%',
            textAlign: 'center',
        },
    },
}));

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>('');

    const { forgotPassword } = useMyContext();

    const onSubmitHandler = (e: Event|any):FormDataEvent|any => {
        e.preventDefault();
        forgotPassword(email);
        setEmail('');
    }

    const { classes } = useStyles();
    return (
        <div className="forgot-container">
            <Container size={460} my={30}>
                <Title className={classes.title} align="center">
                    Forgot your password?
                </Title>
                <Text c="dimmed" fz="sm" ta="center">
                    Enter your email to get a reset link
                </Text>

                <form onSubmit={onSubmitHandler}>
                    <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                        <TextInput onChange={(e) => setEmail(e.target.value)} value={email} label="Your email" placeholder="me@mantine.dev" type='email' required />
                        <Group position="apart" mt="lg" className={classes.controls}>
                            <Anchor color="dimmed" size="sm" className={classes.control}>
                                <Center inline>
                                    <IconArrowLeft size={rem(12)} stroke={1.5} />
                                    <Link to="/login">
                                        <Box ml={5}>Back to the login page</Box>
                                    </Link>
                                </Center>
                            </Anchor>
                            <Button onClick={onSubmitHandler} className={classes.control}>Sent Link to reset password</Button>
                        </Group>
                    </Paper>
                </form>
            </Container>
        </div>
    );
};


export default ForgotPassword;