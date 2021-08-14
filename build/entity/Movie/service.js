"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieService = void 0;
const typedi_1 = require("typedi");
const model_1 = require("./model");
let MovieService = class MovieService {
    constructor() {
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            return yield model_1.Movie.find();
        });
        this.test = () => __awaiter(this, void 0, void 0, function* () {
            return 's';
        });
        this.getOne = (id) => __awaiter(this, void 0, void 0, function* () {
            const movie = yield model_1.Movie.findOne({ where: { id } });
            if (!movie) {
                throw new Error(`The movie with id: ${id} does not exist!`);
            }
            return movie;
        });
        this.create = (createMovieInput) => __awaiter(this, void 0, void 0, function* () {
            return yield model_1.Movie.create(createMovieInput).save();
        });
        this.update = (id, updateMovieInput) => __awaiter(this, void 0, void 0, function* () {
            const movieFound = yield model_1.Movie.findOne({ where: { id } });
            if (!movieFound) {
                throw new Error(`The movie with id: ${id} does not exist!`);
            }
            Object.assign(movieFound, updateMovieInput);
            const updatedMovie = yield movieFound.save();
            return updatedMovie;
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            const movieFound = yield model_1.Movie.findOne({ where: { id } });
            if (!movieFound) {
                throw new Error(`The movie with id: ${id} does not exist!`);
            }
            yield movieFound.remove();
            return true;
        });
    }
};
MovieService = __decorate([
    typedi_1.Service()
], MovieService);
exports.MovieService = MovieService;
//# sourceMappingURL=service.js.map