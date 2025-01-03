import { IsString, IsNotEmpty } from 'class-validator';

export class TopProductsDto {
  @IsString()
  @IsNotEmpty()
  area: string;
}
