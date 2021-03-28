import {Language} from './language';

export interface User {
    id: number;
    username: string;
    education: string;
    gender: string;
    birth_year: number;
    languages: Language[];
    menu_language: Language;
    accent: string;
    country: string;
    is_publisher: boolean;
}
