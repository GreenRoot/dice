const steps = [{ dice_1: 0, dice_2: 0 }]

const dices = document.querySelector('.dice-wrapper')
const reset = document.querySelector('#reset')
const back = document.querySelector('#back')

dices.addEventListener('click', async (e) => {
  await diceAnimation()
  const dice_1 = Math.floor(Math.random() * 6) + 1
  const dice_2 = Math.floor(Math.random() * 6) + 1

  if(steps[0].dice_1 === 0) {
    steps[0].dice_1 = dice_1
    steps[0].dice_2 = dice_2
  } else {
    steps.push({dice_1, dice_2})
  }
  console.log('steps', steps)
  renderDices()
})

reset.addEventListener('click', () => {
  steps.length = 0
  steps.push({ dice_1: 0, dice_2: 0 })
  renderDices()
  console.log('steps' ,steps)
})

back.addEventListener('click', () => {
  if(steps.length > 1) {
    steps.pop()
    renderDices()
    console.log('steps' ,steps)
  }
})

function diceAnimation() {
  const dices = document.querySelector('.dice-wrapper');
  const totalSteps = 17; // total number of rolls
  const duration = 1000; // 1 second

  return new Promise((resolve) => {
    for (let i = 0; i < totalSteps; i++) {
      const delay = easeInQuad(i, 0, duration, totalSteps);

      setTimeout(() => {
        dices.innerHTML = `
          <div class="dice">
            ${Math.floor(Math.random() * 6) + 1}
          </div>
          <div class="dice">
            ${Math.floor(Math.random() * 6) + 1}
          </div>
        `;

        if (i === totalSteps - 1) {
          resolve();
        }
      }, delay);
    }
  });
}

function renderDices() {
  renderPlayersTotalPoints(steps)
  renderHistory(steps)
  const dices = document.querySelector('.dice-wrapper');
  if (steps.at(-1).dice_1 === steps.at(-1).dice_2) {
    dices.innerHTML = `
    <div class="dice" style='color: #e2b714'>
        ${steps.at(-1).dice_1}
    </div>
    <div class="dice" style='color: #e2b714'>
        ${steps.at(-1).dice_2}
    </div>
  `
    return
  }
  dices.innerHTML = `
    <div class="dice">
        ${steps.at(-1).dice_1}
    </div>
    <div class="dice">
        ${steps.at(-1).dice_2}
    </div>
  `;
}

function getPlayersSteps(stepsArray) {
  const playersSteps = [];

  for (let i = 0; i < stepsArray.length; i += 2) {
    const player_1 = stepsArray[i] || { dice_1: 0, dice_2: 0 };
    const player_2 = stepsArray[i + 1] || { dice_1: 0, dice_2: 0 };

    playersSteps.push({
      id: Math.floor(i / 2),
      player_1,
      player_2
    });
  }
  console.log('playersSteps', playersSteps)
  return playersSteps;
}

function getPlayersTotalPoints(stepsArray) {
  const playersSteps = getPlayersSteps(stepsArray);
  const playersTotalPoints = {
    player_1: 0,
    player_2: 0
  };

  for (const step of playersSteps) {
    playersTotalPoints.player_1 += step.player_1.dice_1 + step.player_1.dice_2;
    playersTotalPoints.player_2 += step.player_2.dice_1 + step.player_2.dice_2;
  }

  console.log('playersTotalPoints', playersTotalPoints);
  return playersTotalPoints;
}

function renderPlayersTotalPoints(stepsArray) {
  const playersTotalPoints = getPlayersTotalPoints(stepsArray)
  const playersTotalPointsBody = document.querySelector('.history__header');
  playersTotalPointsBody.innerHTML = `
      <div class="player-sum">${playersTotalPoints.player_1}</div>
      <div class="player-sum">${playersTotalPoints.player_2}</div>
  `
}

function renderHistory(stepsArray) {
  const playersSteps = getPlayersSteps(stepsArray)
  const historyBody = document.querySelector('.history__body');
  historyBody.innerHTML = '';
  for (let i = 0; i < playersSteps.length; i++) {
    let player1Dice1 = playersSteps[i].player_1.dice_1;
    let player1Dice2 = playersSteps[i].player_1.dice_2;
    let player2Dice1 = playersSteps[i].player_2.dice_1;
    let player2Dice2 = playersSteps[i].player_2.dice_2;
    let player1DiceColor = '';
    let player2DiceColor = '';

    if (player1Dice1 === player1Dice2 && player1Dice1 !== 0) {
      player1DiceColor = 'style="color: #e2b714;"';
    }

    if (player2Dice1 === player2Dice2 && player2Dice1 !== 0) {
      player2DiceColor = 'style="color: #e2b714;"';
    }

    historyBody.innerHTML += `
    <li class="step">
      <div class="player">
        <div ${player1DiceColor} class="player__dice">${player1Dice1}</div>
        <div ${player1DiceColor} class="player__dice">${player1Dice2}</div>
      </div>
      <div class="player">
        <div ${player2DiceColor} class="player__dice">${player2Dice1}</div>
        <div ${player2DiceColor} class="player__dice">${player2Dice2}</div>
      </div>
    </li>
  `
  }


}

function easeInQuad(t, b, c, d) {
  t /= d;
  return c * t * t + b;
}