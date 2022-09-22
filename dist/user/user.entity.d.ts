export declare class User {
    Id: number;
    Email: string;
    Password: string;
    resetToken: string;
    resetDate: Date;
    isDeleted: boolean;
    deletedDate: Date;
    deletedBy: string;
}
