const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000;

// Parsing middleware
// Parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false })); // Remove 
app.use(express.urlencoded({extended: true })); // New
// Parse application/json
// app.use(bodyParser.json()); // Remove
app.use(express.json()); 
app.use(bodyParser.json())// New
app.use(cors());
// MySQL Code goes here
const pool = mysql.createConnection({
    connectionLimit : 10,
    host: '',
    user: '',
    password: '',
    database: ''
})

// Get all beers
app.get("/atracciones", (req, res) => {
        
        pool.query('SELECT * from atracciones', (err, rows) => {
            // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from atracciones are: \n', rows)
        })
    
})

app.get('/:id', (req,res) => {
    const id = parseInt(req.params.id)
    pool.query('delete from atracciones where idatraccion = ?', [id], (err,rows) =>{

    if (!err) {
        res.send('La atracción se ha borrado')
    } else {
        console.log(err)
    }
})
})

app.post('/post',(req,res) => {
    const params = req.body
    console.log(params)
    const values = [params.idatraccion,params.nombre,params.aforo,params.edadrecomendada,params.duracionmin]
    pool.query('insert into atracciones values (?)',[values],(err,rows) =>{
        
        if (!err) {
            res.send('La atracción se ha insertado')
        } else {
            console.log(err)
        }
    })
    })

app.put('/put',(req,res) => {
    const {idatraccion,nombre,aforo,edadrecomendada,duracionmin} = req.body
    console.log(req.body)
    pool.query('update atracciones set nombre = ?, aforo = ?, edadrecomendada = ?, duracionmin = ? where idatraccion = ?',[nombre,parseInt(aforo),parseInt(edadrecomendada),parseInt(duracionmin),parseInt(idatraccion)],(err,rows) => {
       
        
        if (!err) {
            res.send('La atracción se ha insertado')
        } else {
            console.log(err)
        }
    })
})
// Listen on enviroment port or 5000

app.listen(port, () => console.log(`Listening on port ${port}`))
