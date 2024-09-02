const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

//GET usuarios y "home"
app.get('/', (req, res) => {
    res.send(`
    <h1> Lista de usuarios</h1>
    <ul>
    ${usuarios.map(usuario => `<li>ID: ${usuario.id} | Nombre: ${usuario.nombre} | Edad: ${usuario.edad} | 
    Procedencia: ${usuario.lugarProcedencia} </li>`).join('')}
    </ul>
    <form action="/usuarios" method="post">
    <label for"nombre">Nombre</label>
    <input type="text" id="nombre" name="nombre" required>
    <label for"edad">Edad</label>
    <input type="text" id="edad" name="edad" required>
    <label for"lugarProcedencia">Procedencia</label>
    <input type="text" id="lugarProcedencia" name="lugarProcedencia" required>
    <button type="submit">Agregar usuario</button>
    </form>
    <a href="/usuarios"> Usuarios(json)</a>
    `);
  });

  //POST crea usuarios
  app.get('/usuarios', (req, res) => {
    res.json(usuarios);
  });

  app.post('/usuarios', (req, res) =>{
    const nuevoUsuario = {
      id: usuarios.length + 1,
      nombre: req.body.nombre,
      edad: req.body.edad,
      lugarProcedencia: req.body.lugarProcedencia,
    };
    usuarios.push(nuevoUsuario);
    res.redirect('/');
  });

//GET /usuarios/:nombre
app.get('/usuarios/:nombre', (req, res) => {
    const usuario = usuarios.find(u => u.nombre.toLowerCase() === req.params.nombre.toLowerCase());

    if (usuario) {
        res.send(`<p>El usuario al que has accedido es: ID: ${usuario.id}, Nombre: ${usuario.nombre}, Edad: ${usuario.edad}, Procedencia: ${usuario.lugarProcedencia}</p><br><a href="/">Home</a>`);
    } else {
        res.status(404).send(`<p>El usuario con nombre ${req.params.nombre} no fue encontrado.</p><br><a href="/">Home</a>`);
    }
});


app.listen(3000, () => {
    console.log('El server esta escuchando en el puerto 3000, enlace: http://localhost:3000/')
});