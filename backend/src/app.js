const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/contracts', require('./routes/contracts'));
app.use('/api/revenues', require('./routes/revenues'));
app.use('/api/costs', require('./routes/costs'));
app.use('/api/cashflows', require('./routes/cashflows'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/export', require('./routes/export'));
app.use('/api/backup', require('./routes/backup'));

app.get('/', (req, res) => res.send('API is running...'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;