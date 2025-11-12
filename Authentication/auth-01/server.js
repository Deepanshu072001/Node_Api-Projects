const express = require('express');

const app = express()
const PORT = 5002

app.use(express.json());

const DIARY = { };
const EMAILs = new Set();

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    if(EMAILs.has(email)) {
        return res.status(400).json({ error: 'Email already taken'});
    }

    // create a token for user
    const token = `${Date.now() }`;

    // Do a entry in the diary
    DIARY [token] = { name, email, password};
    EMAILs.add(email);

return res.json({ status: 'Success', token });
});

app.post('/me', (req, res) => {
    const { token } = req.body;
    if(!token) {
        return res.status(400).json({ error: 'Missing token '});
    }

    if (!(token in DIARY)) {
        return res.status(400).json({ error: 'Invalid token '});
    }

    const entry = DIARY[token];

return res.json({ data: entry });
});

app.post('/private-data', (req, res) => {
    const { token } = req.body;

    if(!token) {
        return res.status(400).json({ error: 'Missing token '});
    }

    if (!(token in DIARY)) {
        return res.status(400).json({ error: 'Invalid token '});
    }

    const entry = DIARY[token];
    return res.json({ data: { privateData: 'Access Granted'}})

});


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
