import { JwtPayload } from 'jwt-decode'

export interface CustomJwtPayload extends JwtPayload {
    type?: string;
    name?: string;
    surname?: string;
}