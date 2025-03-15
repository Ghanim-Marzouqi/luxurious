import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        success: boolean;
        message: string;
        data: {
            access_token: string;
            user: {
                id: any;
                email: any;
                firstName: any;
                lastName: any;
                isAdmin: any;
            };
        };
    }>;
    register(registerDto: RegisterDto): Promise<{
        success: boolean;
        message: string;
        data: {
            user: {
                id: string;
                email: string;
                firstName: string;
                lastName: string;
                isAdmin: boolean;
            };
        };
        error?: undefined;
    } | {
        success: boolean;
        message: any;
        error: string;
        data?: undefined;
    }>;
    getProfile(req: any): {
        success: boolean;
        message: string;
        data: {
            user: any;
        };
    };
}
