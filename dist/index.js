"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connectToDb_1 = require("./db/connectToDb");
const config_1 = require("./config");
const user_route_1 = require("./routes/user.route");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_route_1 = require("./routes/auth.route");
const note_route_1 = __importDefault(require("./routes/note.route"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
}));
app.get("/", (req, res) => {
    res.send("REST API with Typescript");
});
app.use("/api/users", user_route_1.userRouter);
app.use("/api/sessions", auth_route_1.authRouter);
app.use("/api/notes", note_route_1.default);
// error handler
app.use(errorHandler_1.default);
app.listen(config_1.PORT || 8000, () => {
    console.log(`server is running http://localhost:${config_1.PORT} 🚀🚀`);
    (0, connectToDb_1.connectToMongo)();
});
