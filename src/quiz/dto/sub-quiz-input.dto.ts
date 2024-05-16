import { ApiProperty } from "@nestjs/swagger";
import { ChoiceDto } from "./choice.dto";

export class SubQuizInputDto {
    @ApiProperty()
    description: string;

    @ApiProperty()
    timestampStart: number;

    @ApiProperty()
    timestampEnd: number;

    @ApiProperty({ type: [ChoiceDto] })
    choice: string;
}