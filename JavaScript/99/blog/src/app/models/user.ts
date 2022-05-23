export interface User {
    name: string;
    website: string;
    email: string;
    companyName: string;
    companyCatchPhrase: string;
    companyBs: string;
}

export interface UserDto {
    name: string;
    website: string;
    email: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

export interface Post {
    postId: number;
    title: string;
    body: string;
}