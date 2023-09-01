import { LucideIcon } from "lucide-react";

export interface Err {
    response:any;
}

export interface CategoryProps {
  icon: LucideIcon,
  title: string,
  color: string,
}


export interface Timeline {
    id: number ,
    year: number,
    eventType: string,
    references: any[],
    reference: number,
    serviceDate: Date,
    resourceType: string,
    eventHeader: string,
    provider: string,
    facility: string,
    cost: string,
    clinicalNotes: string
}

export interface User {
    userName: string;
    email: string;
    password: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    gender?: string;
    phoneNumber?: string;
}
