const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ADD YOUR KEYS HERE
const validKeys = new Set([
    'VGwywBLKJiXbbQNvwmmuDEVJyNFZgykM',
    'key2here',
    'key3here'
]);

// ADD YOUR SCRIPTS HERE
const scripts = {
    '9b7f0a065a587b127a8a15389a81a58b': {
        code: `print("Your script loaded!")`
    }
};

app.post('/api/validate', (req, res) => {
    const { script_key, loader_hash } = req.body;
    
    if (!validKeys.has(script_key)) {
        return res.json({ success: false, message: 'Invalid key' });
    }
    
    if (!scripts[loader_hash]) {
        return res.json({ success: false, message: 'Script not found' });
    }
    
    res.json({ success: true, code: scripts[loader_hash].code });
});

app.get('*', (req, res) => {
    res.status(403).send('Website Protected - Access Denied');
});

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});
