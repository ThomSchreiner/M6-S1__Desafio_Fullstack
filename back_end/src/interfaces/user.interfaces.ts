export interface iClientRequest {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone_number: string;
}
export type iContactRequest = Omit<iClientRequest, "password">;

export interface iClientResponse {
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
