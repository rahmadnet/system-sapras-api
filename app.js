const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');

const userRoutes = require('./api/routes/user');
const categoryRoutes = require('./api/routes/category');
const barangRoutes = require('./api/routes/barang');
const peminjamanRoutes = require('./api/routes/peminjaman');
const kegiatanRoutes = require('./api/routes/kegiatan');
const uomRoutes = require('./api/routes/uom');
const cabangRoutes = require('./api/routes/cabang');

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req,res,next) =>{
    res.header('Access-Control-Allow-origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, x-Requested-With, Conten-Type, Sccept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-allow-Methods', 'PUT, POST, PATCH', 'DELETE', 'GET');
        return res.status(200).json({})
    }
    next();
});

// Routes which should handle request

app.use('/users', userRoutes);
app.use('/categorys', categoryRoutes);
app.use('/barang', barangRoutes);
app.use('/peminjaman', peminjamanRoutes);
app.use('/kegiatan', kegiatanRoutes);
app.use('/uoms', uomRoutes);
app.use('/cabang', cabangRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req,res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
})

module.exports= app;
