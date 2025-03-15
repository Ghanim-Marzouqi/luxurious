export declare class User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
    hashPassword(): Promise<void>;
    validatePassword(password: string): Promise<boolean>;
}
