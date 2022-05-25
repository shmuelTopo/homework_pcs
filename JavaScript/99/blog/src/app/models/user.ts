export interface User {
    name: string;
    website: string;
    email: string;
    companyName: string;
    companyCatchPhrase: string;
    companyBs: string;
    id: number;
}

export interface UserDto {
    name: string;
    website: string;
    email: string;
    id: number;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

export interface Post {
    title: string;
    body: string;
    id: number;
}

export interface Comment {
    name: string;
    email: string;
    body: string;
}