import { createStyles, Paper, Title, Text, TextInput, Button, Container, Group, Anchor, Center, Box, rem } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useState } from "react"
import "../styles/Forgot-styles.scss"
import { useMyContext } from '../context/mainContext';
import { toast } from "react-toastify"

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

const ForgetPasswordChange = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [cPassword, setConfirmPassword] = useState<string>('');
  const userObj = {
    email,
    password,
    cPassword,
  }
  const { resetPassword } = useMyContext();

  const onSubmitHandler = (e: Event | any): FormDataEvent | any => {
    e.preventDefault();
    if (password !== cPassword) {
      return toast.error('Password and confirm password should be same', {
        autoClose: 1500,
        position: 'top-center',
        theme: 'colored',
      })
    }
    resetPassword(userObj, window.location.pathname.split('/')[2])
    setEmail('');
    setPassword('')
    setConfirmPassword('');
  }

  const { classes } = useStyles();
  return (
    <div className="forgot-container">
      <Container size={460} my={30}>
        <Title className={classes.title} align="center">
          Change Your Password
        </Title>
        <Text c="dimmed" fz="sm" ta="center">

        </Text>

        <form onSubmit={onSubmitHandler}>
          <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
            <TextInput mt={20} onChange={(e) => setEmail(e.target.value)} value={email} label="Enter your emai" placeholder="me@mantine.dev" type='email' required />
            <TextInput mt={20} onChange={(e) => setPassword(e.target.value)} value={password} label="New Password" placeholder="password" type='password' required />
            <TextInput mt={20} onChange={(e) => setConfirmPassword(e.target.value)} value={cPassword} label="Confirm Password" placeholder="confirm password" type='password' required />
            <Group position="apart" mt="lg" className={classes.controls}>
              <Anchor color="dimmed" size="sm" className={classes.control}>
                <Center inline>
                  <IconArrowLeft size={rem(12)} stroke={1.5} />
                  <Link to="/login">
                    <Box ml={5}>Back to the login page</Box>
                  </Link>
                </Center>
              </Anchor>
              <Button onClick={onSubmitHandler} className={classes.control}>Reset password</Button>
            </Group>
          </Paper>
        </form>
      </Container>
    </div>
  );
};


export default ForgetPasswordChange;