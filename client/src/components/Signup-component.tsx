
import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Text, Paper, PaperProps, Button, Anchor, Stack, Select } from '@mantine/core';
import { Link } from 'react-router-dom';
import "../styles/Signup-styes.scss"
import { FormEvent, useState } from 'react';
import { createStyles, UnstyledButton, Menu, Image, Group, rem } from '@mantine/core';
import { useNavigate } from "react-router-dom"
import { useMyContext } from '../context/mainContext';
import { Calendar, DateInput } from '@mantine/dates';
const data = [
  { label: 'Male' },
  { label: 'Female' },
  { label: 'Other' }
];

const useStyles = createStyles((theme, { opened }: { opened: boolean }) => ({
  control: {
    width: rem(200),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,
    border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]
      }`,
    transition: 'background-color 150ms ease',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[opened ? 5 : 6]
        : opened
          ? theme.colors.gray[0]
          : theme.white,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  label: {
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
  },

  icon: {
    transition: 'transform 150ms ease',
    transform: opened ? 'rotate(180deg)' : 'rotate(0deg)',
  },
}));

const Signup = (props: PaperProps) => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const [username, setusername] = useState<String>('');
  const [email, setEmail] = useState<String>('');
  const [password, setPassword] = useState<String>('');
  const [gender, setGender] = useState<String>('');
  const dob = date?.getDay() + "/" + date?.getMonth() + "/" + date?.getFullYear().toString();

  const userSignupData = {
    username,
    email,
    password,
    gender,
    dob,
  }

  const { signUpUser } = useMyContext();
  const form = useForm({
    initialValues: { email: '', name: '', password: '', terms: true, },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    const isTrue: any = signUpUser(userSignupData);
    if (isTrue) {
      navigate("/");
    }
  }

  const [opened, setOpened] = useState(false);
  const { classes } = useStyles({ opened });
  const [selected, setSelected] = useState(data[0]);
  const items = data.map((item) => (
    <Menu.Item
      icon={<Image src={item.image} width={18} height={18} />}
      onClick={() => setSelected(item)}
      key={item.label}
    >
      {item.label}
    </Menu.Item>
  ));
  return (
    <section className='signupSection'>
      <form onSubmit={onSubmitHandler} className='form-signup'>
        <Paper radius="md" p="xl" withBorder {...props}>
          <Text size="lg" weight={500}>
            Welcome to Spotlight Healthcare , Register for free !
          </Text>
          <form onSubmit={form.onSubmit(() => { })}>
            <Stack p={10}>
              <TextInput
                label="Username"
                placeholder="Please enter your full name"
                onChange={(e) => setusername(e.target.value)}
                radius="md"
              />

              <TextInput
                required
                label="Email"
                placeholder="hello@spotlight.org"
                onChange={(e) => setEmail(e.target.value)}
                error={form.errors.email && 'Invalid email'}
                radius="md"
              />

              <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                onChange={(e) => setPassword(e.target.value)}
                error={form.errors.password && 'Password should include at least 6 characters'}
                radius="md"
              />
              <Select
                label="Gender"
                onChange={(e: String | null) => setGender(e)}
                placeholder="Select your gender"
                data={['Male', 'Female', 'Other']}
              />
              <DateInput
                onChange={(e) => setDate(e)}
                label="Enter your D.O.B."
              />
            </Stack>

            <Group position="apart" mt="xl">
              <Link to="/login">
                <Anchor
                  component="button"
                  type="button"
                  color="dimmed"
                  size="xs"
                >
                  Already have an account? Login
                </Anchor>
              </Link>
              <Button type="submit" onClick={onSubmitHandler} radius="xl">
                Signup
              </Button>
            </Group>
          </form>
        </Paper>
      </form>
    </section>
  );
}

export default Signup;