const express = require('express')
const app = express()
const port = 3000

// HTTP 메소드(라우팅, 콜백 함수)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/sound/:name', (req, res) => {
    const { name } = req.params;

    console.log(name)

    if(name == "dog") {
         res.json({'sound':'멍멍멍'})
     } else if(name == "cat") {
     res.json({'sound':'야옹'})
     } else {
         res.json({'sound':'기타'})
     }
  })

  app.get('/user/:id', (req, res) => {
    const p = req.params;
    console.log(p)
    const q = req.query;
    console.log(q)

    res.json({'userid': q.a})
  })

  app.post('/user/:id', (req, res) => {
    const p = req.params;
    console.log(p)
    const q = req.body;
    console.log(q)

    res.json({'userid': q.a})
  })

  app.get('/cat', (req, res) => {
    res.send('고양이')
  })

  app.get('/dog', (req, res) => {
    res.send('<h>강아지</h>')
  })

  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})