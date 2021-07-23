import { getCountryDetails, getRegionDetails } from "../services/service";
import { shuffle } from "./Helpers";

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
export const randomOtherAnswers = (dataArray, blacklistedIndex, numberOfNeededAnswers = 3) => {
    const length = dataArray.length - 1;
    const questions = [];
    const alreadyUsedIndexes = [];

    while (alreadyUsedIndexes.length < numberOfNeededAnswers) {
        var r = Math.floor(Math.random() * length); //+ 1;

        if (alreadyUsedIndexes.indexOf(r) === -1 && blacklistedIndex !== r) {
            alreadyUsedIndexes.push(r);
        }
    }

    for (const i of alreadyUsedIndexes) {
        questions.push(dataArray[i]);
    }

    return questions;
};

export const getAllQuestions = (dataArray, questionNo, neighbor = false) => {
    var questionsAndIndexes = randomQuestions(dataArray, questionNo);
    return getAllData(dataArray, questionsAndIndexes, neighbor);
};

export const getAllData = (dataArray, questionsAndIndexes) => {
    const allQuestions = [];
    const questions = [...questionsAndIndexes.questions];
    const indexes = [...questionsAndIndexes.indexes];

    for (var i = 0; i < indexes.length; ++i) {
        var data = [];
        data = [...randomOtherAnswers(dataArray, indexes[i]), questions[i]];

        allQuestions.push(data);
    }

    return {
        correctAnswers: questions,
        allQuestions: allQuestions,
    };
};

export const generateGuessTheNeighbourQuestions = async (region, questionNo) => {
    const dataArray = await getRegionDetails(region);
    const randomCountries = randomQuestions(dataArray, questionNo);
    const questions = [];

    console.log('itt');
    for (const country of randomCountries.questions) {
        let goodAnswer = 'No neighbour';


        if (country.borders?.length > 0) {
            const randomNeighbourIndex = Math.floor(Math.random() * country.borders.length);

            const borderCountry = await getCountryDetails(
                country.borders[randomNeighbourIndex]
            );

            goodAnswer = borderCountry.name;
        }

        const question = {
            country: country.name,
            correctAnswer: goodAnswer,
            options: [goodAnswer],
        };

        const otherOptions = randomOtherAnswers(dataArray, dataArray.indexOf(country));
        for (const otherOption of otherOptions) {
            question.options.push(otherOption.name);
        }

        shuffle(question.options);
        questions.push(question);
    }

    return questions;
};
