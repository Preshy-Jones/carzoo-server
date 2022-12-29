"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const middlewares_1 = require("./middlewares");
const corsOptions_1 = __importDefault(require("./config/corsOptions"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions_1.default));
app.use(express_1.default.json());
dotenv_1.default.config();
app.use("/", require("./routes"));
app.use(middlewares_1.notFoundHandler);
app.use(middlewares_1.errorHandler);
const mongooseConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(process.env.DB_CONNECT);
    try {
        yield mongoose_1.default.connect(process.env.DB_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
        });
        console.log("connected to mongodb");
    }
    catch (error) {
        console.log(error);
    }
});
mongooseConnect();
const port = process.env.PORT || 8008;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
