const express = require("express");
const app = express();
// const server = require("http").createServer(app);
const SerialPort = require("serialport");
const path = require("path");
// const io = require("socket.io")(server);

const Readline = SerialPort.parsers.Readline;

const port = new SerialPort("COM3", {
    baudRate: 9600,
    autoOpen: false
});

const parser = port.pipe(new Readline({ delimiter: "\n" }));

port.open(err => {
    if (err) {
        return console.log("Error Opening port: ", err.message);
    }
    parser.on("data", data => {
        console.log(data);
        io.emit("Serial-data:", {
            value: data.toString()
        });
    });
});



app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/", (request, response) => {
    response.render("index.html");
});

// io.on("connection", socket => {
//     console.log("A user conneceted");
// });

const server = app.listen(3000, () => {
    console.log("Server Up and Running!!");
});

const io = require("socket.io").listen(server);
