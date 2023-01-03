import config from 'dotenv/config'
import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes/index.js'
import ErrorHandler from './middleware/ErrorHandler.js'
import fileUpload from 'express-fileupload';
import mysql from 'mysql2';

const PORT = process.env.PORT || 8080;
const host = "localhost";

const app = express();

app.use(cors({origin: ['http://localhost:3006'], credentials: true}))

app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload());
app.use(cookieParser(process.env.SECRET_KEY));
app.use('/api', router);

//
app.get('/', function (request, response) {
    response.send('Hello Test');
  });
//

// обработка ошибок
app.use(ErrorHandler);

const connection = mysql.createConnection({
    host : '127.0.0.1',
    user: 'root',
    port : '3306',
    database : process.env.DB_NAME,
    password : 'Qwertyuiop2000'
});

connection.connect( async (err) => {
    try {
        if (err) {
            throw new Error();
        }
        else {
            //await sequelize.sync({alter: true})//, force : true})
            app.listen(PORT, host, () => console.log(`Server starting on http://${host}:${PORT}`));
        }
    }
    catch (err) {
        throw new Error(err);
    }
})

export default app;