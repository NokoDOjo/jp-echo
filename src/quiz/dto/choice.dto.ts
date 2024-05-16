import { ApiProperty } from "@nestjs/swagger";

export class ChoiceDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    content: string;

    @ApiProperty()
    isCorrect: boolean;
}