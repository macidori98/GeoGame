//correct answers
export const randomQuestions = (dataArray, questionNumer) => {
    const length = dataArray.length;
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

    return questions;
};

//other answers
export const randomOtherAnswers = (dataArray, blacklistedAlpha2Code = '') => {
    const length = dataArray.length;
    const questions = [];
    const alreadyUsedIndexes = [];

    var index = Math.floor(Math.random() * length);

    for (let i = 0; i < 3; ++i) {

        console.log(dataArray[index].alpha2Code == blacklistedAlpha2Code);
        while (alreadyUsedIndexes.findIndex((item) => item == index) > -1 || dataArray[index].alpha2Code == blacklistedAlpha2Code) {
            index = Math.floor(Math.random() * length);
            console.log(dataArray[index].alpha2Code == blacklistedAlpha2Code);
        }
        console.log('-----------------------');

        alreadyUsedIndexes.push(index);
        questions.push(dataArray[index]);
    }

    return questions;
};

export const getRemainingData = (dataArray, array) => {
    const others = [];
    for (const q of array) {
        others.push(randomOtherAnswers(dataArray, q.alpha2Code));
    }

    return others;
};
