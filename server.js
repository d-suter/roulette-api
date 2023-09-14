const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

function getColor(number) {
    if (number === 0) return 'green';
    if (number <= 10 || (number > 18 && number <= 28)) {
        return number % 2 === 0 ? 'black' : 'red';
    } else {
        return number % 2 === 0 ? 'red' : 'black';
    }
}

function spinRoulette() {
    const number = Math.floor(Math.random() * 37);
    const color = getColor(number);
    return { number, color };
}

app.get('/spin', (req, res) => {
    const { number, color } = spinRoulette();
    const hash = crypto.createHash('sha256').update(Date.now() + uuidv4()).digest('hex');

    fs.readFile('results.json', 'utf-8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            console.error('Error reading from results.json:', err);
            return res.status(500).send('Failed to read previous results');
        }

        let results = [];
        let currentID = 1;  // Default ID if results.json is empty

        if (data && data.length > 0) {
            results = JSON.parse(data);
            if (results.length) {
                // Get the highest existing ID and add 1
                currentID = results[results.length - 1].id + 1;
            }
        }
        
        const result = {
            id: currentID,
            number,
            color,
            hash
        };

        results.push(result);

        fs.writeFile('results.json', JSON.stringify(results, null, 4), (err) => {
            if (err) {
                console.error('Error writing to results.json:', err);
                return res.status(500).send('Failed to store result');
            }
            return res.json(result);
        });
    });
});



app.get('/verify/:hash', (req, res) => {
    const { hash } = req.params;

    // Simple hash validation (length and character set)
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
            return res.json(matchingResult);
        } else {
            return res.status(404).json({ error: "Hash not found" });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
