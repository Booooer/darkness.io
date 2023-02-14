// Присваивание каждой карте данные и прочее
cards.forEach(card => card.addEventListener('click',function(){
    cardName = card.querySelector('.card-name').value
    cardInfo = card.querySelector('.card-info').value
    let src = card.querySelector('img').getAttribute('src')
    attack = card.querySelector('.card-attack').innerHTML
    health = card.querySelector('.card-health').innerHTML
    document.getElementById('btn-ultimate').disabled = true
    energy = 0

    isAction.style.bottom = `0%`
    playerCards.style.display = "none"

    activeCardPlayer.innerHTML = ""
    activeCardPlayer.innerHTML = 
        `<img src='${src}' alt="">
        <p class="card-attack">${attack}</p>
        <p class="card-health">${health}</p>`
    
    card.style.display = "none"
    buff = false
    if (countEnemies === maxEnemies && countCards === maxCountCards) {
        createEnemy()    
    }
    countCards--
}))

// Информация о карточках в модальном окне

// раскрыть модальное окно во время боя
cards.forEach(card => card.addEventListener('mouseover', function(){
    showModalInfo(card)
}))

// скрыть модальное окно во время боя
cards.forEach(card => card.addEventListener('mouseout', hideModalInfo))

// раскрыть модальное окно
activeCardPlayer.addEventListener('mouseover',function(){
    showModalInfo()
})
// скрыть модальное окно
activeCardPlayer.addEventListener('mouseout',function(){
    hideModalInfo()
})

// Удаление всех анимаций с карты врага
activeCardEnemy.addEventListener('animationend',function(){
    activeCardEnemy.classList.remove('get-damage')
    activeCardEnemy.classList.remove('enemy-attack')
    activeCardEnemy.classList.remove('ultimate')
})

// Удаление всех анимаций с карты игрока
activeCardPlayer.addEventListener('animationend',function(){
    activeCardPlayer.classList.remove('player-attack')
    activeCardPlayer.classList.remove('buff')
    activeCardPlayer.classList.remove('heal')
    activeCardPlayer.classList.remove('ultimate')
})

function Attack(){
    // Блокируем кнопку атаки до окончания действуйщей
    blockActions()

    console.log('Вы наносите ' + attack + ' урона')
    healthEnemy -= attack
    sizeDamage()
    ++energy
    // анимация нанесения урона врагу
    activeCardPlayer.classList.add('player-attack')
    // анимация получения урона врага
    setTimeout(function(){
        activeCardEnemy.classList.add('get-damage')
        enemyMove()
    },500)
    if (buff) {
        console.log('delete buff')
        deleteBuff()   
    }
    else{
        document.getElementById('btn-buff').disabled = false
    }
}

function Ultimate(){
    activeCardPlayer.classList.add('ultimate')
    energy = 0
    setTimeout(function(){
        switch (cardName) {
            case 'Лада Гранта':
                health = 1
                healthEnemy = 0
                break;
            case 'Милф Слэйер':
                healthEnemy -= attack * 2
                deleteBuff()     
                break;
            case 'Лесник': 
                for (let i = 0; i < healthEnemy; i++) {
                    attack++
                }
                break; 
            case 'Бог PHP':
                let src = 'img/cards/TrueGod_card.png'
                cardName = 'Истинный Бог PHP'
                cardInfo = 'Истинный Бог станит питонистов, даруя энергию и пополняя себе здоровье на значение атаки'
                attack = 5
                health = 10
                activeCardPlayer.innerHTML = ""
                activeCardPlayer.innerHTML = 
                `<img src='${src}' alt="">
                <p class="card-attack">${attack}</p>
                <p class="card-health">${health}</p>`
                break;  
            case 'Истинный Бог PHP':
                energy++
                document.getElementById('btn-ultimate').disabled = true
                for (let i = 0; i < attack; i++) {
                    health++;                   
                }
                updateStats() 
                return
            case 'Лёша Пиздабольский':
                healthEnemy -= 5
                energy = 0
                document.getElementById('btn-ultimate').disabled = true
                if (healthEnemy <= 0) {
                    deathEnemy()
                }
                else{
                    updateStats()  
                }
                return
            case 'Порш Каен':
                buffAttack++
                buffAttack++
                break
            case 'Джуси Пуси':
                buffHeal++
                buffHeal++
                buffHeal++
                health = 0
                break
            case 'Фурри Бой':
                deleteBuff()
                let diff = attack
                attack = attackEnemy
                attackEnemy = diff
                break
            case 'Андрей Маск':
                let i = attackEnemy
                attackEnemy = healthEnemy
                healthEnemy = i
                energy = 0
                document.getElementById('btn-ultimate').disabled = true
                if (healthEnemy <= 0) {
                    deathEnemy()
                }
                else{
                    updateStats()  
                }
                return
            case 'Твой отец':
                for (let i = 0; i < (damage + 2); i++) {
                    health++         
                }
                console.log("Хп поднялось до" + health)
                damage = 0
                break
            case 'Они-чан':
                healthEnemy -= 12
                break   
            case 'Кот Роман':
                for (let i = 0; i < 8; i++) {
                    health++                  
                }
                attack--
                break
            case 'Денис Святой':
                attackEnemy -= 1
                updateStats()
                return
            case 'Санёчек':
                let b = maxCountCards - countCards
                healthEnemy -= b + 5
                break
            case 'Гейм Мастер':
                attack++
                healthEnemy -= health
                break                 
        }
        enemyMove()
        document.getElementById('btn-ultimate').disabled = true
    },1500)
}

function bossUltimate(){
    console.log(arrayEnemies[2].health)
    energyBoss = 0
    switch(nameEnemy){
        case 'Апостол моделирования':
            healthEnemy -= 10
            if (healthEnemy <= 0) {
                return deathEnemy()
            }
            health -= attackEnemy * 3
            break
        case 'Блокнотик':
            attack = 0
            break
        case 'Хранитель реестра':
            healthEnemy = arrayEnemies[2].health
            break
        case 'Восьмая миля':
            if (healthEnemy < 4) {
                for (let i = 0; i < 12; i++) {
                    healthEnemy++                   
                }
            }
            else{
                health /= 2 
            }
            break
        case 'Вестник легаси кода':
            health = 0
            break                
    }
    updateStats()
}

function enemyMove(){
    clearStats()
    updateStats()
    if (healthEnemy <= 0) {
        deathEnemy()
    }
    
    if (energyBoss >= 5) {
        //activeCardEnemy.classList.add('ultimate')
    
        setTimeout(function(){
            activeCardEnemy.classList.add('ultimate')
            bossUltimate() 
        },1000)
    }
    else{
        setTimeout(function(){
            activeCardEnemy.classList.add('enemy-attack')
            health -= attackEnemy
            energyBoss++
            updateStats()
        },500)
    }
}
