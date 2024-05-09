const game = {
  players: ['Батон', 'Доброжир'],
  steps: [{ dice1: 0, dice2: 0 }]
}

const dices = document.querySelector('.dice-wrapper')
const reset = document.querySelector('.reset')

dices.addEventListener('click', (e) => {
  const dice1 = Math.floor(Math.random() * 6) + 1
  const dice2 = Math.floor(Math.random() * 6) + 1
  game.steps.push({ dice1, dice2 })
  dicesRender()
  console.log(game)
})

reset.addEventListener('click', (e) => {
  game.steps = [{ dice1: 0, dice2: 0 }]
  dicesRender()
})

function dicesRender() {
  const dices = document.querySelector('.dice-wrapper')
  dices.innerHTML = `
    <div class="dice">
        ${game.steps[game.steps.length - 1].dice1}
    </div>
    <div class="dice">
        ${game.steps[game.steps.length - 1].dice2}
    </div>
  `
}
