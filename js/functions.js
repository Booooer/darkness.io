function clearStats(){
    activeCardEnemy.querySelector('.card-health').innerHTML = ""
    activeCardPlayer.querySelector('.card-health').innerHTML = ""

    activeCardEnemy.querySelector('.card-attack').innerHTML = ""
    activeCardPlayer.querySelector('.card-attack').innerHTML = ""
}

function updateStats(){
    activeCardEnemy.querySelector('.card-health').innerHTML = healthEnemy
    activeCardEnemy.querySelector('.card-attack').innerHTML = attackEnemy

    if (health <= 0) {
        deathPlayer()
    }
    else{
        activeCardPlayer.querySelector('.card-health').innerHTML = health
        activeCardPlayer.querySelector('.card-attack').innerHTML = attack
    }

    if (energy == 2) {
        buttonUltimate.disabled = false
    }
}

function createEnemy(){
    enemy = arrayEnemies[countEnemies - 1]
    attackEnemy = enemy.attack
    healthEnemy = enemy.health
    nameEnemy = enemy.name

    activeCardEnemy.innerHTML = ""
    activeCardEnemy.innerHTML = 
        `<img src='${enemy.img}' alt="">
        <p class="card-attack">${enemy.attack}</p>
        <p class="card-health">${enemy.health}</p>`    
}

function deathEnemy(){
    if (countEnemies > 1) {
        energyBoss = 0
        --countEnemies
        createEnemy()
    }
    else{
        alert('Вы победили!', location.reload())
    }
}

function deathPlayer(){
    activeCardPlayer.innerHTML = ""
    damage = 0
    if (countCards > 0) {
        buttonHeal.disabled = false
        isAction.style.bottom = `100%`
        playerCards.style.display = ""
    }
    else{
        alert('Вы проиграли!', location.reload())
    }
}

function blockActions(){
    buttonAttack.disabled = true

    setTimeout(function(){
        buttonAttack.disabled = false
    },1500)
}

function showModalInfo(card){
    if (!card) {
        modalInfo.innerHTML = cardInfo
    }
    else{
        let info = card.querySelector('.card-info').value
        modalInfo.innerHTML = info
    }
    modalInfo.style.top = "0%"
}

function hideModalInfo(){
    modalInfo.style.top = "-100%"
}

function sizeDamage(){
    for (let i = 0; i < attack; i++) {
        damage++       
    }
    console.log(damage)
}

function buffATK(){
    buttonBuffAttack.disabled = true
    activeCardPlayer.querySelector('.card-attack').style.color = "green"
    activeCardPlayer.classList.add('buff')    
    energy++
    for (let i = 0; i < buffAttack; i++) {
        attack++     
    }
    buff = true
    setTimeout(enemyMove,1200)
}

function deleteBuff(){
    if (buff) {
        attack -= buffAttack
        activeCardPlayer.querySelector('.card-attack').style.color = "#fff"  
        buttonBuffAttack.disabled = false
        buff = false
    }
    updateStats()
}

function Heal(){
    buttonHeal.disabled = true
    activeCardPlayer.classList.add('heal') 
    energy++
    for (let i = 0; i < buffHeal; i++) {
        health++       
    }
    setTimeout(enemyMove,1200)
}