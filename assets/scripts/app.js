const ATTACK_VALUE = 10
const MONSTER_ATTACK_VALUE = 14

let choseMaxLife = 100
let currentMonsterhealth = choseMaxLife
let currentPlayerHealth = choseMaxLife

adjustHealthBars(choseMaxLife)

function attackHandler(){
    const damage = dealMonsterDamage (ATTACK_VALUE)
    currentMonsterhealth -= damage
    const playerDamage =dealPlayerDamage(MONSTER_ATTACK_VALUE)
    currentPlayerHealth -= playerDamage


    if(currentMonsterhealth <= 0 && currentPlayerHealth > 0)
    {
        alert("You won !!")
    }
    else if (currentPlayerHealth<=0 && currentMonsterhealth > 0)
    {
        alert('You lost !!')
    }
    else if(currentPlayerHealth <= 0 && currentMonsterhealth<=0)
    {
        alert("You have a draw !!")
    }

}

attackBtn.addEventListener('click',attackHandler)