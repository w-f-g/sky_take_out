import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsNotEmpty } from 'class-validator'

export class ReportDTO {
  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  begin: string

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  end: string
}