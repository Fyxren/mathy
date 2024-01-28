export interface Answer {
    answer?: number;
    question: Question;
}

export interface Question {
    answer: number;
    question: string;
}

export interface HistoryItem {
    startTime: Date;
    endTime: Date;
    answers: Answer[];
}