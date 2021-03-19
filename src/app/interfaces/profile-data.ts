import {Language} from './language';
export interface ProfileData {
  gender: string,
  birth_year: number,
  languages: Language[],
  menu_language: Language,
  accent: string,
  country: string
}
