//Creation of the server
const app = express()
const port = 3000

//Middleware
app.use(body_parser.urlencoded({ extended: false })) //Para poder acceder a los parametros con POST, por medio del req.body[nombre_del-parametro]

app.use(express.static('public')) //Para enviar el archivo js.js, el css y las imagines

app.use(function middleware(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip + " - " + req.url)
  console.log()
  next()
}) 

app.get('/', (req, res) => {
    res.send('./views/month.html')
  })

  app.get('/mes', (req, res) => {
    res.sendFile(__dirname + '/views/mes_con_6_filas.html')
  })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

app.post('/api/day', (req, res) => {
    res.json({})
})

app.post('/api/week', (req, res) => {
    res.json({})
})

app.post('/api/month', (req, res) => {
    res.json({})
})

