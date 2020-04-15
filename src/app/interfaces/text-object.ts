export interface TextObject {
    id: number;
    title: string;
    language: string; // language short
    is_right_to_left: boolean;
    shared_folder: number;
    content: string[];
}
