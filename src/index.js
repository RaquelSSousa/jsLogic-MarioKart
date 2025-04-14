// objects --> Characters
const player1 = {
    NAME: "Mario",
    SPEED: 4,
    MANEUVERABILITY: 3,
    POWER: 3,
    POINTS: 0,
};

const player2 = {
    NAME: "Peach",
    SPEED: 3,
    MANEUVERABILITY: 4,
    POWER: 2,
    POINTS: 0,
};

const player3 = {
    NAME: "Yoshi",
    SPEED: 2,
    MANEUVERABILITY: 4,
    POWER: 3,
    POINTS: 0,
};

const player4 = {
    NAME: "Bowser",
    SPEED: 5,
    MANEUVERABILITY: 2,
    POWER: 5,
    POINTS: 0,
};

const player5 = {
    NAME: "Luigi",
    SPEED: 3,
    MANEUVERABILITY: 4,
    POWER: 4,
    POINTS: 0,
};

const player6 = {
    NAME: "Donkey Kong",
    SPEED: 2,
    MANEUVERABILITY: 2,
    POWER: 5,
    POINTS: 0,
};

// simulate dice roll
async function rollDice() {
    // Math.random() returns a number between 0 and 1
    // Multiply by 6 to get a number between 0 and 6, then add 1 to get a number between 1 and 6
    // Math.floor rounds down to the nearest integer
    return Math.floor(Math.random() * 6) + 1;
}

// get a random block type
async function getRandomBlock() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = "STRAIGHT";
            break;
        case random < 0.66:
            result = "CURVE";
            break;
        default:
            result = "CONFRONTATION";
            break;
    }

    return result;
}

// log dice result to console
async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`➡️  ${characterName} 🎲 rolled a ${block} dice: ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

// simulate race
async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Round ${round}...`);

        let block = await getRandomBlock();
        console.log(`🟰  Block: ${block}`);

        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        let totalSkillTest1 = 0;
        let totalSkillTest2 = 0;

        if (block === "STRAIGHT") {
            totalSkillTest1 = diceResult1 + character1.SPEED;
            totalSkillTest2 = diceResult2 + character2.SPEED;

            await logRollResult(character1.NAME, "SPEED", diceResult1, character1.SPEED);
            await logRollResult(character2.NAME, "SPEED", diceResult2, character2.SPEED);
        }

        if (block === "CURVE") {
            totalSkillTest1 = diceResult1 + character1.MANEUVERABILITY;
            totalSkillTest2 = diceResult2 + character2.MANEUVERABILITY;

            await logRollResult(character1.NAME, "MANEUVERABILITY", diceResult1, character1.MANEUVERABILITY);
            await logRollResult(character2.NAME, "MANEUVERABILITY", diceResult2, character2.MANEUVERABILITY);
        }

        if (block === "CONFRONTATION") {
            let powerResult1 = diceResult1 + character1.POWER;
            let powerResult2 = diceResult2 + character2.POWER;

            console.log(`${character1.NAME} confronted ${character2.NAME} and rolled POWER: ${powerResult1} vs ${powerResult2}`);

            await logRollResult(character1.NAME, "POWER", diceResult1, character1.POWER);
            await logRollResult(character2.NAME, "POWER", diceResult2, character2.POWER);

            if (powerResult1 > powerResult2 && character2.POINTS > 0) {
                console.log(`⚠️  ${character2.NAME} lost 1 point! 🐢`);
                character2.POINTS--;
            } else if (powerResult1 < powerResult2 && character1.POINTS > 0) {
                console.log(`⚠️  ${character1.NAME} lost 1 point! 🐢`);
                character1.POINTS--;
            } else if (powerResult1 === powerResult2) {
                console.log(`🤝  Draw! No points lost`);
            }
        }

        // determine round winner
        if (totalSkillTest1 > totalSkillTest2) {
            console.log(`🏆  ${character1.NAME} won the round and scored 1 point!`);
            character1.POINTS++;
        } else if (totalSkillTest1 < totalSkillTest2) {
            console.log(`🏆  ${character2.NAME} won the round and scored 1 point!`);
            character2.POINTS++;
        } else if (totalSkillTest1 === totalSkillTest2 && block !== "CONFRONTATION") {
            console.log(`🤝  Draw!`);
        }

        console.log('---~~---~~---~~---~~---~~---~~---~~---~~---~~---~~');
    }
}

// declare the final winner
async function declareWinner(character1, character2) {
    console.log("Final result:");
    console.log(`1️⃣  ${character1.NAME}: ${character1.POINTS} point(s)`);
    console.log(`2️⃣  ${character2.NAME}: ${character2.POINTS} point(s)`);

    if (character1.POINTS > character2.POINTS)
        console.log(`\n${character1.NAME} won the race! Congratulations! 🏆`);
    else if (character2.POINTS > character1.POINTS)
        console.log(`\n${character2.NAME} won the race! Congratulations! 🏆`);
    else
        console.log("The race ended in a draw 🤝");
}

// main function (self-invoking)
(async function main() {
    console.log(`🏁🚨 Race between ${player1.NAME} and ${player2.NAME} is starting... \n`);

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();
