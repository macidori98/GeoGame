//correct answers
export const randomQuestions = (dataArray, questionNumer) => {
    const length = dataArray.length - 1;
    const questions = [];
    const alreadyUsedIndexes = [];

    var index = Math.floor(Math.random() * length);

    for (let i = 0; i < questionNumer; ++i) {
        while (alreadyUsedIndexes.findIndex((item) => item === index) > -1) {
            index = Math.floor(Math.random() * length);
        }

        alreadyUsedIndexes.push(index);
        questions.push(dataArray[index]);
    }

    return { questions: questions, indexes: alreadyUsedIndexes };
};

//other answers
export const randomOtherAnswers = (dataArray, blacklistedIndex) => {
    const length = dataArray.length - 1;
    const questions = [];
    const alreadyUsedIndexes = [];

    while (alreadyUsedIndexes.length < 3) {
        var r = Math.floor(Math.random() * length) + 1;

        if (alreadyUsedIndexes.indexOf(r) === -1 && blacklistedIndex !== r) {
            alreadyUsedIndexes.push(r);
        }
    }

    for (const i of alreadyUsedIndexes) {
        questions.push(dataArray[i]);
    }

    return questions;
};

export const getAllQuestions = (dataArray, questionNo) => {
    var questionsAndIndexes = randomQuestions(dataArray, questionNo);
    return getAllData(dataArray, questionsAndIndexes);
};

export const getAllData = (dataArray, questionsAndIndexes) => {
    const allQuestions = [];
    const questions = [...questionsAndIndexes.questions];
    const indexes = [...questionsAndIndexes.indexes];

    for (var i = 0; i < indexes.length; ++i) {
        const data = [...randomOtherAnswers(dataArray, indexes[i]), questions[i]];
        allQuestions.push(data);
    }

    return {
        correctAnswers: questions,
        allQuestions: allQuestions,
    };
};
