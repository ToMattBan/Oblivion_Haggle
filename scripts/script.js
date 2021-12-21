const variables = {
    haggleForm: document.querySelector('#haggle'),
    resultPlace: document.querySelector('#result'),

    dispositionInput: document.querySelector('#disposition'),
    playerSkillInput: document.querySelector('#playerSkill'),
    playerLuckInput: document.querySelector('#playerLuck'),
    merchantSkillInput: document.querySelector('#merchantSkill'),
    merchantLuckInput: document.querySelector('#merchantLuck'),

    playerStats: localStorage.playerStats,
}

function getPlayerStats() {
    if (!variables.playerStats) return;

    variables.playerStats = JSON.parse(variables.playerStats);

    var playerSkill = variables.playerStats.merchantSkill;
    var playerLuck = variables.playerStats.luck;

    variables.playerSkillInput.value = playerSkill;
    variables.playerLuckInput.value = playerLuck;
}

function savePlayerStats() {
    var playerSkill = variables.playerSkillInput.value;
    var playerLuck = variables.playerLuckInput.value;

    variables.playerStats = {
        merchantSkill: playerSkill,
        luck: playerLuck,
    }

    localStorage.playerStats = JSON.stringify(variables.playerStats);
}

function calculeHaggleValue() {
    var disposition = parseInt(variables.dispositionInput.value);
    var playerSkill = parseInt(variables.playerSkillInput.value);
    var playerLuck = parseInt(variables.playerLuckInput.value);
    var merchantSkill = parseInt(variables.merchantSkillInput.value);
    var merchantLuck = parseInt(variables.merchantLuckInput.value);

    var best = Math.floor((0.5 * Math.floor(0.4 * (disposition - 10) / 4) + (100 + Math.min(playerSkill + 0.4 * (playerLuck - 50), 100) - Math.min(merchantSkill + 0.4 * (merchantLuck - 50), 100)) / 10) / 0.55)

    best = best + 39;
    best = best + '%';

    variables.resultPlace.innerText = best;
}

export function init() {
    getPlayerStats();

    variables.haggleForm.addEventListener('submit', function (e) {
        e.preventDefault();
        calculeHaggleValue();

        savePlayerStats();
    });
}
