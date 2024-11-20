import express  from "express";
import registerUser from "./userRegistrationController.mjs";
import userLogin from "./userLoginController.mjs";
import auth from "./auth.mjs";
import importData from "./importation.mjs";

const app = express();


app.listen(3000, () => {
    console.log(`App listening to ${3000}`);
})

app.use(express.json());
app.use(express.urlencoded());

app.post('/register', registerUser);
app.post('/login', auth , userLogin);
app.post('/import', auth, importData);
app.get('/', (req, res) => {
    res.json({data : "hello"})
})

export default app;
