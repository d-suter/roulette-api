const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

const mappingData = require('./mapping.json');

let modeMapping = {};
Object.keys(mappingData).forEach(mode => {
    mappingData[mode].forEach(alias => {
        modeMapping[alias.toLowerCase()] = mode;
    });
});

function getColor(number) {
    if (number === 0) return 'green';
    if (number <= 10 || (number > 18 && number <= 28)) {
        return number % 2 === 0 ? 'black' : 'red';
    } else {
        return number % 2 === 0 ? 'red' : 'black';
    }
}

function getEvenOdd(number) {
    if (number === 0) return null; // The number 0 is neither even nor odd
    return number % 2 === 0 ? 'even' : 'odd';
}

function spinRoulette(mode) {
    let maxNumber = 36; // Default to European and French Roulette
    if (mode === 'American') {
        maxNumber = 37; // American Roulette has an additional double zero
    }

    const number = Math.floor(Math.random() * (maxNumber + 1));
    const color = getColor(number);

    return { number, color };
}

app.get('/spin/:mode', (req, res) => {
    const inputMode = req.params.mode.toLowerCase();
    const mode = modeMapping[inputMode];

    if (!mode) {
        return res.status(400).send('Invalid mode specified');
    }

    const { number, color } = spinRoulette(mode);
    const hash = crypto.createHash('sha256').update(Date.now() + uuidv4()).digest('hex');

    fs.readFile('results.json', 'utf-8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Error reading from results.json:', err);
            return res.status(500).send('Failed to read previous results');
        }

        let results = data && data.length > 0 ? JSON.parse(data) : [];

        const result = {
            id: results.length + 1,
            number,
            color,
            hash,
            mode,
            evenOdd: getEvenOdd(number)
        };

        results.push(result);

        fs.writeFile('results.json', JSON.stringify(results, null, 4), (err) => {
            if (err) {
                console.error('Error writing to results.json:', err);
                return res.status(500).send('Failed to store result');
            }

            return res.json({
                hash: result.hash,
                number: result.number,
                color: result.color,
                evenOdd: result.evenOdd
            });
        });
    });
});

app.get('/verify/:hash', (req, res) => {
    const { hash } = req.params;

    if (!hash || !/^[a-f0-9]{64}$/.test(hash)) {
        return res.status(400).json({ error: "Invalid hash provided" });
    }

    fs.readFile('results.json', 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading from results.json:', err);
            return res.status(500).send('Failed to read results');
        }

        const results = JSON.parse(data);

        const matchingResult = results.find(r => r.hash === hash);

        if (matchingResult) {
            return res.json({
                mode: matchingResult.mode,
                number: matchingResult.number,
                color: matchingResult.color,
                evenOdd: matchingResult.evenOdd
            });
        } else {
            return res.status(404).json({ error: "Hash not found" });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
