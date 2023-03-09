import {Language} from './language';


export interface BasicUser {
    id: number;
    username: string;
    email: string;
    education: string;
    gender: string;
    birth_year: number;
    languages: Language[];
    accent: string;
    country: string;
}
