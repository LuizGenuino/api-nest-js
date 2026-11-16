
import { IsNotEmpty, IsNumber, IsString, Matches, MaxLength, Min } from 'class-validator';
export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name: string;

    @IsNotEmpty()
    @Matches(/^[a-z0-9-]+$/, {
        message: 'Slug can only contain lowercase letters, numbers, and hyphens.',
    })
    slug: string;

    @IsString()
    @MaxLength(255)
    description: string;

    @Min(0)
    @IsNotEmpty()
    @IsNumber({maxDecimalPlaces: 2})
    price: number;
}
