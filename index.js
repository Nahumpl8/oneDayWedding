const express = require('express');
const mongoose = require('mongoose');
const session = require("express-session");
const bodyParser = require('body-parser')
const path = require('path');
const MongoStore = require('connect-mongo');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3200;


mongoose.connect(process.env.MONGODB_URI, { ssl: true });
const db = mongoose.connection;

const sessionStore = MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    ttl: 14 * 24 * 60 * 60, 
});

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
});

const Invitado = mongoose.model('Invitado', {
  nombre: String,
  nombreInvitacion: String,
  contraseña: String,
  numeroInvitados: Number,
  weekend: Number,
  asistencia: String,
});

app.set('view engine', 'ejs');

app.use(session({
    secret: 'semilla para generar IDs de sesión',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
}));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  try {
    const invitados = await Invitado.find({}, 'nombre');
    const nombres = invitados.map((invitado) => invitado.nombre);
    res.render('principal', { opcionesNombre: nombres });
  } catch (error) {
    console.error('Error al obtener información de la boda:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.put('/actualizarInvitados/:nombre', async (req, res) => {
  try {
    const { nombre } = req.params; // Obtener el nombre de los parámetros de la ruta
    const { numInvitados, asistencia } = req.body; // Obtener los datos del cuerpo de la solicitud

    // Realizar la actualización en la base de datos usando el nombre obtenido de la ruta
    const usuario = await Invitado.findOneAndUpdate(
      { nombre },
      { numeroInvitados: numInvitados, asistencia }, // Actualizar el número de invitados y la asistencia
      { new: true }
    );

    if (usuario) {
      res.status(200).json({ mensaje: 'Número de invitados actualizado correctamente' });
    } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar número de invitados:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});



app.get('/invitacion', async (req, res) => {
  try {
      res.render('invitacion', { });
  } catch (error) {
      console.error('Error al obtener información de la invitación:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/hoteles', async (req, res) => {
  try {
      res.render('hoteles', { });
  } catch (error) {
      console.error('Error al obtener información de la invitación:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/dress-code', async (req, res) => {
  try {
      res.render('dress-code', { });
  } catch (error) {
      console.error('Error al obtener información de la invitación:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/all-weekend', async (req, res) => {
  try {
      res.render('all-weekend', { });
  } catch (error) {
      console.error('Error al obtener información de la invitación:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/programa-dia', async (req, res) => {
  try {
      res.render('programa-dia', { });
  } catch (error) {
      console.error('Error al obtener información de la invitación:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.post('/login', async (req, res) => {
  try {
      const { nombre, numInvitados } = req.body;
      const usuarioAutenticado = await Invitado.findOne({ nombre});

      if (usuarioAutenticado) {
          res.render('invitacion', { usuario: usuarioAutenticado });
      } else {
          res.redirect('/login');
          
      }
  } catch (error) {
      console.error('Error al procesar formulario de login:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.get('/login', async (req, res) => {
  try {
      const invitados = await Invitado.find({}, 'nombre');
      const nombres = invitados.map((invitado) => invitado.nombre);
      res.render('login', { opcionesNombre: nombres });
  } catch (error) {
      console.error('Error al obtener opciones de nombres:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.get('/getInvitados/:nombre', async (req, res) => {
  try {
    const { nombre } = req.params;
    const usuario = await Invitado.findOne({ nombre });

    if (usuario) {
      res.json({ numInvitados: usuario.numeroInvitados });
    } else {
      res.json({ numInvitados: null });
    }
  } catch (error) {
    console.error('Error al obtener el número de invitados:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});



app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.use((req, res, next) => {
  res.status(404).render('404', { mensaje: 'Página no encontrada' });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
