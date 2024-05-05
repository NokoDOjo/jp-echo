import { ApiProperty } from "@nestjs/swagger";

export class SubQuizInputDto {
    @ApiProperty()
    description: string;

    @ApiProperty()
    timestampStart: number;

    @ApiProperty()
    timestampEnd: number;
}