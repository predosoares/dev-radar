const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const routes = require("./routes")

const app = express()

mongoose.connect("mongodb+srv://omnistack:omnistack@devfinder-olq8t.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cors()) 
app.use(express.json())
app.use(routes)

// Principais métodos da arquitetura REST 
// Métodos HTTP semânticos:
// get, post, put, delete

// Tipos de parâmetros:

// Query params : São visivéis na URL   request.query ( filtros , ordenação , paginação, .. )
// Route params ( PUT , DELETE ) : request.params ( identificar um recurso na alteraçãoou remoção )
// Body ( POST , PUT ) : request.body ( criação ou alteração de um registro )

// MongoDB ( Não-relacional )

app.listen(3333)