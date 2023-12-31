console.log("Cheguei no INDEX.JS");

const express = require('express');
const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');  

app.set('views', 'src/views');  

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());   

const postRoutes = require('./routes/post-routes');
app.use('/', postRoutes);

app.listen(3000, () => {
    console.log("SERVER STARTED AT 3000");
});