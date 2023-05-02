const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK ='MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL ='PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';


const enteredValue = prompt("Maximum life for you and the monster.","100");

let chosenMaxLife = parseInt(enteredValue);

if(isNaN(chosenMaxLife) || chosenMaxLife <=0){
    chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);


function writetolog(event, value,monsterHealth,playerHealth){
  let logEntry ;
  if(event === LOG_EVENT_PLAYER_ATTACK){
    logEntry = {
      event : event,
      value: value,
      target: 'MONSTER',
      finalMonsterHealth:monsterHealth,
      finalPlayerHealth: playerHealth
    };
    battleLog.push(logEntry);
  }else if(event === LOG_EVENT_PLAYER_STRONG_ATTACK){
    logEntry = {
      event : event,
      value: value,
      target: 'MONSTER',
      finalMonsterHealth:monsterHealth,
      finalPlayerHealth: playerHealth
    };
    battleLog.push(logEntry);
} else if(event === LOG_EVENT_MONSTER_ATTACK) {
  logEntry = {
    event : event,
    value: value,
    target: 'PLAYER',
    finalMonsterHealth:monsterHealth,
    finalPlayerHealth: playerHealth
  };
  battleLog.push(logEntry);
} else if(event === LOG_EVENT_PLAYER_HEAL)
{
  logEntry = {
    event : event,
    value: value,
    target: 'PLAYER',
    finalMonsterHealth:monsterHealth,
    finalPlayerHealth: playerHealth
  };
  battleLog.push(logEntry);
}else if(event === LOG_EVENT_GAME_OVER){
  logEntry = {
    event : event,
    value: value,
    
    finalMonsterHealth:monsterHealth,
    finalPlayerHealth: playerHealth
  };
  battleLog.push(logEntry);
}

}

function reset(){
     currentMonsterHealth = chosenMaxLife;
     currentPlayerHealth = chosenMaxLife;
     resetGame(chosenMaxLife);
}

function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  if(currentPlayerHealth <= 0 && hasBonusLife){
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert("You would be die but bonus life saved you");
    
}
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You won!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You lost!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert('You have a draw!');
  }

  if(currentMonsterHealth <= 0 || currentPlayerHealth <= 0){
    reset();
  }
}

function attackMonster(mode) {
  let maxDamage;
  if (mode === MODE_ATTACK) {
    maxDamage = ATTACK_VALUE;
  } else if (mode === MODE_STRONG_ATTACK) {
    maxDamage = STRONG_ATTACK_VALUE;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  endRound();
}

function attackHandler() {
  attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("You can't heal to more than your max initial health.");
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);