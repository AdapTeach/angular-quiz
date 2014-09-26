angular.module('questions', [])

    .constant('Items', [
        {
            description: 'A class can\'t be private',
            assessments: [
                {
                    type: 'YESNO',
                    question: 'A class can be private',
                    answer: false
                },
                {
                    type: 'YESNO',
                    question: 'A class can NOT be private',
                    answer: true
                }
            ]
        },
        {
            description: 'The last index of an array is its length - 1',
            assessments: [
                {
                    type: 'MCQ',
                    question: 'What is the last index of an array ?',
                    answers: [
                        {
                            text: '0'
                        },
                        {
                            text: 'array.length - 1',
                            isCorrect: true
                        },
                        {
                            text: 'array.length'
                        },
                        {
                            text: 'array.length + 1'
                        },
                        {
                            text: '10'
                        }
                    ]
                }
            ]
        },
        {
            description: 'Trying to access an index that is outside of an array\'s bounds ' +
                'results in an ArrayIndexOutOfBoundsException to be thrown',
            assessments: [
                {
                    type: 'MCQ',
                    question: {
                        code: 'int[] array = new int[10];\n' +
                            'int i = array[10];',
                        text: 'What is the value of i ?'
                    },
                    answers: [
                        {text: '0'},
                        {text: '10'},
                        {text: 'null'},
                        {text: 'an ArrayIndexOutOfBoundsException is thrown', isCorrect: true}
                    ]
                }
            ]
        },
        {
            description: 'The first index of an array is 0',
            assessments: [
                {
                    type: 'NUMBER',
                    question: 'What is the first index of an array ?',
                    answer: 0
                },
                {
                    type: 'MCQ',
                    question: 'What is the first index of an array ?',
                    answers: [
                        { text: '-1' },
                        { text: '0', isCorrect: true },
                        { text: '1' }
                    ]
                }
            ]
        },
        {
            description: 'Exception is a checked exception',
            assessments: [
            ]
        }
    ]);