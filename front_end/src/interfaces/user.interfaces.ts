export interface iClientRegister {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone_number: string;
}

export interface iClient {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface iContact {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface iLogin {
    email: string;
    password: string;
}

export interface iLoginResponse {
    token: string;
}
