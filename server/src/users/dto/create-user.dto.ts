import { IsEmail, IsNotEmpty, MinLength, IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ 
    description: 'The email of the user',
    example: 'user@example.com' 
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ 
    description: 'The first name of the user',
    example: 'John' 
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ 
    description: 'The last name of the user',
    example: 'Doe' 
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ 
    description: 'The password of the user (min 6 characters)',
    example: 'password123',
    minLength: 6 
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ 
    description: 'Whether the user is an admin',
    example: false,
    required: false,
    default: false
  })
  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean;
} 