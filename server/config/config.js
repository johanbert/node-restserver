// ========================
//  Puerto
// ========================
process.env.PORT = process.env.PORT || 3000;

// ========================
//  Entorno
// ========================
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// ========================
//  Entorno
// ========================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/coffee';
} else {
    urlDB = 'mongodb+srv://johanbert:RZFrN24p7ijyyh1f@cluster0.y5jih.mongodb.net/coffee';
}
// urlDB = 'mongodb+srv://johanbert:RZFrN24p7ijyyh1f@cluster0.y5jih.mongodb.net/coffee';

process.env.URLDB = urlDB;