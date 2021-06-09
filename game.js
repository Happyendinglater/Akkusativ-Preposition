const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Wir mieten das Zimmer _____ Frühstück.",
        choice1: "ohne",
        choice2: 'durch',
        choice3: 'gegen',
        choice4: 'um',
        answer: 1,
    },
    {
        question: "Sesamstraße ist eine Sendung _____ Kinder.",
        choice1: "durch",
        choice2: "gegen",
        choice3: "für",
        choice4: "um",
        answer: 3,
    },
    {
        question: "Sie sind _____ den Park spazieren gegangen.",
        choice1: "durch",
        choice2: "ohne",
        choice3: "für",
        choice4: "um",
        answer: 1,
    },
    {
        question: "Ich habe dir das Paket _____ die Post geschickt.",
        choice1: "gegen",
        choice2: "durch",
        choice3: "um",
        choice4: "für",
        answer: 2,
    },
    {
        question: "Er ist schon sechs Wochen _____ Arbeit.",
        choice1: "für",
        choice2: "um",
        choice3: "ohne",
        choice4: "durch",
        answer: 3,
    },
    {
        question: "Wir sparen Geld _____ ein Haus.",
        choice1: "für",
        choice2: "ohne",
        choice3: "gegen",
        choice4: "durch",
        answer: 1,
    },
    {
        question: "Wir sind _____ ganz Deutschland gereist.",
        choice1: "für",
        choice2: "durch",
        choice3: "ohne",
        choice4: "gegen",
        answer: 2,  
    },
    {
        question: "Was können wir _____ den Klimawandel tun?",
        choice1: "um",
        choice2: "gegen",
        choice3: "ohne",
        choice4: "für",
        answer: 2,
    },
    {
        question: "Das Konzert beginnt _____.",
        choice1: "durch den Krieg",
        choice2: "für den Beruf eines Kochs",
        choice3: "um 20.00 Uhr",
        choice4: "ohne Musik",
        answer: 3,
    },
    {
        question: "Die Studentin arbeitet _____.",
        choice1: "für die Wand",
        choice2: "ohne Pause",
        choice3: "durch den Tunnel",
        choice4: "um eine Insel  ",
        answer: 2,
    },
    {
        question: "Wir haben unser Auto _____ verkauft.",
        choice1: "für 5.000 Euro",
        choice2: "um eine Banane",
        choice3: "ohne eine Postkarte",
        choice4: "durch den Tür",
        answer: 1,
    },
    {
        question: "Habt ihr die Hausaufgaben _____ schon gemacht?",
        choice1: "für Montag",
        choice2: "durch das Fenster",
        choice3: "ohne meıne Kommode",
        choice4: "um der Tisch",
        answer: 1,
    },
    {
        question: "_____ kann ich nicht leben.",
        choice1: "Für das dach",
        choice2: "Gegen das Wochenende",
        choice3: "Ohne dich",
        choice4: "Um 13.45",
        answer: 3,
    },
    {
        question: "Was kann man _____ tun?",
        choice1: "gegen trockene Haut",
        choice2: "durch das Zımmer",
        choice3: "um seıne Schultern ",
        choice4: "um Freundinnen ",
        answer: 1,
    },
    {
        question: "In der Region _____ sind viele Schlösser und Gärten.",
        choice1: "um Koblenz",
        choice2: "für den Herbst ",
        choice3: "ohne eıne Krawatte",
        choice4: "für dıe Kinder",
        answer: 1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 15

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
