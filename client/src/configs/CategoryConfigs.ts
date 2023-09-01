import { Icons } from "../components/Icons";
import { CategoryProps } from "../../types";



export const categoriesConfig: CategoryProps[] = [
    {
        "title": 'Condition',
        "icon": Icons['condition'],
        "color": "red",
    },
    {
        'title': 'Observation',
        "icon": Icons['observation'],
        "color": "yellow",
    },
    {
        'title': 'Procedure',
        "icon": Icons['procedure'],
        "color": "#14a8b6",
    },
    {
        'title': 'Allergies',
        "icon": Icons['allergies'],
        "color": 'green',
    },
    {
        'title': 'Immunization',
        "icon": Icons['immunization'],
        "color": 'green',
    },
    {
        'title': 'Medication',
        "icon": Icons['medication'],
        "color": "#14a8b6",
    }
]