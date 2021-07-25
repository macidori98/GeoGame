export const Screens = {
    game: 'Game',
    statistics: 'Statistics',
    study: 'Study',
};

export const Regions = [
    { name: 'Africa' }, { name: 'Americas' }, { name: 'Asia' },
    { name: 'Europe' }, { name: 'Oceania' },
];

export const GameTypes = [
    { name: 'Guess the capital' },
    { name: 'Guess the neighbor' },
    { name: 'Guess the flag' },
];

export const GameModes =
{
    GuessTheCapital: 'Guess the capital',
    GuessTheNeighbor: 'Guess the neighbor',
    GuessTheFlag: 'Guess the flag',
};

export const InitialGameObj = { type: '', region: '', questionNo: '' };

export const InitialDetailedStatObj = { correctAns: 0, startDate: Date(), duration: '' };

export const QuestionNumberOptions = [{ name: '5' }, { name: '10' }, { name: '15' }];

export const API_URL = 'https://restcountries.eu/rest/v2';

export const DATABASE_KEY = 'games';
