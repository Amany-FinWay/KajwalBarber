export interface Login {
    email: string;
    password: string
}

export interface LoggedInUserData {
    userId: number,
    fullName: string,
    email: string,
    token: string,
    expiresAt: Date
}

export interface SuccessfulLogin {
  data: LoggedInUserData;
  isValid: boolean;
  message: string;
}