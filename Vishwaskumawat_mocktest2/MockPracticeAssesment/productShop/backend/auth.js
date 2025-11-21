// question 10 


// REST API + JWT Authentication 



const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const SECRET = "MYSECRET123";

// LOGIN route
app.post("/login", (req, res) => {
  const { email, password } = req.body;
// 
  if (email === "admin@test.com" && password === "12345") {
    const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });
    return res.json({ token });
  }

  res.status(401).json({ error: "Invalid Credentials" });
});

// MIDDLEWARE
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token missing" });

  try {
    jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

// PROTECTED
app.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to Dashboard" });
});

app.listen(4500, () => console.log("Auth server on 4500"));
