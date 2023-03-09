import {Language} from './language';


export interface User {
    id: number;
    username: string;
    email: string;
    education: string;
    gender: string;
    birth_year: number;
    languages: Language[];
    accent: string;
    country: string;
    is_publisher: boolean;
    is_listener: boolean;
}
