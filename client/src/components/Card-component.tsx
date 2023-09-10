import { createStyles, Card, Text, SimpleGrid, UnstyledButton, Anchor, Group, rem, } from '@mantine/core';
import Condition from "../assets/condition.png"
import Observation from "../assets/observation.png"
import Procedure from "../assets/procedure.png"
import Allergies from "../assets/allergies.png"
import Immunization from "../assets/immunization.png"
import Medication from "../assets/medication.png"
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react"
const mockdata = [
    { title: 'Condition', icon: Condition, color: 'indigo' },
    { title: 'Observation', icon: Observation, color: 'violet' },
    { title: 'Procedure', icon: Procedure, color: 'blue' },
    { title: 'Allergies', icon: Allergies, color: 'green' },
    { title: 'Immunization', icon: Immunization, color: 'teal' },
    { title: 'Medication', icon: Medication, color: 'cyan' }
];

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 700,
    },

    item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: theme.radius.md,
        height: rem(90),
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        transition: 'box-shadow 150ms ease, transform 100ms ease',

        '&:hover': {
            boxShadow: theme.shadows.md,
            transform: 'scale(1.05)',
        },
    },
}));

const HealthCard = () => {
    const { classes } = useStyles();

    const [dimensions, setDimensions] = useState({ width: window.innerWidth })
    useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    const items = mockdata.map((item) => (
        <UnstyledButton key={item.title} className={classes.item}>
            <Link style={{ "textDecoration": "none", color: "black" }} to={`/resourcetype/${item.title}`}>
                <img style={{ height: "20px", width: "20px" }} src={item.icon} alt="" />
                <Text size="xs" mt={7}>
                    {item.title}
                </Text></Link>
        </UnstyledButton>
    ));

    return (
        <>
            <Card style={{ margin: "0 auto" }} h={300} w={dimensions.width > 600 ? 500 : 300} withBorder radius="md" className={classes.card}>
                <Group position="apart">
                    <Text className={classes.title}>Resource Types </Text>
                    <Anchor size="xs" color="dimmed" sx={{ lineHeight: 1 }}>
                        Resource Types
                    </Anchor>
                </Group>
                <SimpleGrid cols={3} mt="md">
                    {items}
                </SimpleGrid>
            </Card>
        </>
    );
}


export default HealthCard; 