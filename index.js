// Imports
import cors from  'cors';


// Create an express app
const app = express();
const port = +process.env.PORT || 4001;

// Middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Request-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Expose-Headers", "Authorization");
    next()
})

app.use(
    express.static("./static"),
    express.json(),
    express.urlencoded({
        extended:true
    }),
    cors()
)

// Routes

// Endpoint

// Start the server