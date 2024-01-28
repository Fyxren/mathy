import type { Answer } from "$lib/types/game.interface";

export const game = {
    generateQuestions: function () {
        let questions = [];
        for (let i = 0; i < 3; i++) {
            let a = Math.floor(Math.random() * 10);
            let b = Math.floor(Math.random() * 10);
            questions.push({ question: `${a} + ${b}`, answer: a + b });
        }
        return questions;
    },

    saveHistory: function (startTime: Date, endTime: Date, answers: Answer[]) {
        let history = JSON.parse(localStorage.getItem('history') as any) || [];
        history.push({ startTime, endTime, answers });
        localStorage.setItem('history', JSON.stringify(history));
    }
};