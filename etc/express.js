const express = require('express')
const app = express()
const port = 3000

// HTTP 메소드(라우팅, 콜백 함수)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
      