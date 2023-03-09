import {Language} from './language';


export interface ProfileData {
  email: string;
  education: string;
  gender: string,
  birth_year: number,
  languages: Language[],
  accent: string,
  country: string
}
