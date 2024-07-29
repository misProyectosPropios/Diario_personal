//Creation of the server
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('./views/month.html')
  })
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })