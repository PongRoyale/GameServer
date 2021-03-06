const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3001

/* Route Importing */
const usersRoute = require('./routes/users')
const friendsRoute = require('./routes/friends')

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({ extended: true })
)

app.get('/', (req, res) => {
  response.json({ info: 'API Entry' })
});

app.use('/users', usersRoute);
app.use('/friends', friendsRoute);

app.listen(port, () => {
  console.log(`running on port ${port}.`)
})