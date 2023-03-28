export interface iClientRegister {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone_number: string;
}

export type iContactRegister = Omit<iClientRegister, "password">;

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

export type iClientUpdate = Partial<iClientRegister>;
export type iContactUpdate = Partial<iContactRegister>;

export interface iLogin {
    email: string;
    password: string;
}

export interface iLoginResponse {
    token: string;
}
