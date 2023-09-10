import { FC } from 'react'
import { createStyles, Header, HoverCard, Group, Button, UnstyledButton, Text, ThemeIcon, Divider, Center, Box, Burger, Drawer, Collapse, ScrollArea, rem, Image, } from '@mantine/core';
import HeathCareLogo from "../assets/logo-head.gif";
import { useDisclosure } from '@mantine/hooks';
import { IconNotification, IconCode, IconBook, IconChartPie3, IconFingerprint, IconCoin, IconChevronDown } from '@tabler/icons-react';
import "../styles/Nav-styes.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react"
import { useMyContext } from '../context/mainContext';
const useStyles = createStyles((theme) => ({
    link: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,

        [theme.fn.smallerThan('sm')]: {
            height: rem(42),
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        },

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        }),
    },

    subLink: {
        width: '100%',
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        borderRadius: theme.radius.md,

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        }),

        '&:active': theme.activeStyles,
    },

    dropdownFooter: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        margin: `calc(${theme.spacing.md} * -1)`,
        marginTop: theme.spacing.sm,
        padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
        paddingBottom: theme.spacing.xl,
        borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
            }`,
    },

    hiddenMobile: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    hiddenDesktop: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },
}));

const mockdata = [
    {
        icon: IconCode,
        title: 'Open source',
        description: 'This Pokémon’s cry is very loud and distracting',
    },
    {
        icon: IconCoin,
        title: 'Free for everyone',
        description: 'The fluid of Smeargle’s tail secretions changes',
    },
    {
        icon: IconBook,
        title: 'Documentation',
        description: 'Yanma is capable of seeing 360 degrees without',
    },
    {
        icon: IconFingerprint,
        title: 'Security',
        description: 'The shell’s rounded shape and the grooves on its.',
    },
    {
        icon: IconChartPie3,
        title: 'Analytics',
        description: 'This Pokémon uses its flying ability to quickly chase',
    },
    {
        icon: IconNotification,
        title: 'Notifications',
        description: 'Combusken battles with the intensely hot flames it spews',
    },
];

const NavBar: FC = () => {
    const navigate = useNavigate();
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const { classes, theme } = useStyles();

    const { loggedIn, logout } = useMyContext()
    const logoutHandler = () => {
        (async function () {
            const isLoggedOut: any = await logout();
            console.log(isLoggedOut)
            if (isLoggedOut == true) {
                navigate("/login");
            }
        })()
    }
    useEffect(() => {
    }, [logoutHandler])


    const links = mockdata.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title}>
            <Group noWrap align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon size={rem(22)} color={theme.fn.primaryColor()} />
                </ThemeIcon>
                <div>
                    <Text size="sm" fw={500}>
                        {item.title}
                    </Text>
                    <Text size="xs" color="dimmed">
                        {item.description}
                    </Text>
                </div>
            </Group>
        </UnstyledButton>
    ));

    return (
        <Box pb={10}>
            <Header height={60} px="md">
                <Group position="apart" sx={{ height: '100%' }}>
                    <div className="title">
                        <img src={HeathCareLogo} style={{ backgroundColor: "white", height: "65px", width: "90px", "borderRadius": "50%", marginTop: "-6px" }} alt="" />
                        <h2>Spotlight</h2>
                    </div>

                    <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
                        <Link to="/" className={classes.link}>
                            Home
                        </Link>
                        {loggedIn ?
                            <><Button onClick={logoutHandler} variant="default">Log Out</Button></> : <>
                                <Link to='/login'><Button variant="default">Log in</Button></Link>
                                <Link to='/signup'><Button variant="default">Signup</Button></Link>
                            </>
                        }
                    </Group>
                    <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
                </Group>
            </Header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Navigation"
                className={classes.hiddenDesktop}
                zIndex={1000000}
            >
                <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
                    <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

                    <a href="#" className={classes.link}>
                        Home
                    </a>

                    <Collapse in={linksOpened}>{links}</Collapse>
                    <a href="#" className={classes.link}>
                        Learn
                    </a>
                    <a href="#" className={classes.link}>
                        Academy
                    </a>

                    <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

                    <Group position="center" grow pb="xl" px="md">
                        {loggedIn ? <>
                            <Button onClick={logoutHandler} variant="default">Log Out</Button></> :
                            <Link to='/login'><Button variant="default">Log in</Button></Link>}
                        {loggedIn ? <>
                        </> : <Button>Sign up</Button>}
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}

export default NavBar