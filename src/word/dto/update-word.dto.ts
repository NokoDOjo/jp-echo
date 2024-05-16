import { ApiProperty } from "@nestjs/swagger";

export class UpdateWordDto {
    @ApiProperty()
    japanese: string;

    @ApiProperty()
    chinese: string;

    @ApiProperty()
    jlptLevel?: number;

    @ApiProperty()
    subtitleLineId?: number;
}