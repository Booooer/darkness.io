// Все боссы и их характеристики

let arrayEnemies = [
    {
        name: 'Вестник легаси кода',
        ultimate: 'Отчисляет своего врага',
        attack: 12,
        health: 60,
        img: 'img/cards/bosses/Legacy_boss.png'
    },
    {
        name: 'Восьмая миля',
        ultimate: 'Если хп менее 4 ед, то хилит на 12, в другом случае наносит урезает хп игрока вдвое',
        attack: 9,
        health: 19,
        img: 'img/cards/bosses/EightMile_boss.png'
    },
    {
        name: 'Хранитель реестра',
        ultimate: 'Реестр повреждён... Хп Хранителя откатилось до первоначального уровня',
        attack: 5,
        health: 35,
        img: 'img/cards/bosses/Defender_boss.png'
    },
    {
        name: 'Блокнотик',
        ultimate: 'Ваш крутой ide заменяется блокнотом, из-за чего вы сановитесь бессильным',
        attack: 7,
        health: 14,
        img: 'img/cards/bosses/Note_boss.png'
    },
    {
        name: 'Апостол моделирования',
        ultimate: 'Апостол отнимает 10 ед своего хп, после нанося игроку тройной урон',
        attack: 3,
        health: 42,
        img: 'img/cards/bosses/Apostol3D_boss.png'
    },
]

// Данные о врагах

let energyBoss = 0
let countEnemies = arrayEnemies.length
let maxEnemies = countEnemies
let enemy
let nameEnemy
let healthEnemy
let attackEnemy

// Данные о игроке

const cards = document.querySelectorAll('.card')
let countCards = cards.length
let maxCountCards = countCards
let attack = 0
let health = 0
let energy = 0
let buff = false
let buffAttack = 2
let buffHeal = 4
let cardName
let cardInfo
let damage = 0

// Переменные игрового поля

let activeCardPlayer = document.querySelector('.card-player')
let activeCardEnemy = document.querySelector('.card-enemy')
const modalInfo = document.querySelector('.modal-info')
const playerCards = document.querySelector('.cards')
const isChooseCard = document.querySelector('.game-action')
const isAction = document.querySelector('.actions')

// Кнопки действий

const buttonAttack = document.getElementById('btn-attack')
const buttonBuffAttack = document.getElementById('btn-buff')
const buttonHeal = document.getElementById('btn-heal')
const buttonUltimate = document.getElementById('btn-ultimate')