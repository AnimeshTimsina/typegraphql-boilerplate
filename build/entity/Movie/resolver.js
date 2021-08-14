"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.MovieResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typedi_1 = require("typedi");
const input_1 = require("./input");
const model_1 = require("./model");
const service_1 = require("./service");
let MovieResolver = class MovieResolver {
    constructor(movieService) {
        this.movieService = movieService;
    }
    getMovies() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.movieService.getAll();
        });
    }
    getMovie(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.movieService.getOne(id);
        });
    }
    addMovie(createMovieInput) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.movieService.create(createMovieInput);
        });
    }
    updateMovie(id, updateMovieInput) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.movieService.update(id, updateMovieInput);
        });
    }
    deleteMovie(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.movieService.delete(id);
        });
    }
};
__decorate([
    type_graphql_1.Query((_) => [model_1.Movie], { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MovieResolver.prototype, "getMovies", null);
__decorate([
    type_graphql_1.Query((_) => model_1.Movie, { nullable: true }),
    __param(0, type_graphql_1.Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MovieResolver.prototype, "getMovie", null);
__decorate([
    type_graphql_1.Mutation((_) => model_1.Movie),
    __param(0, type_graphql_1.Arg('MovieInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_1.CreateMovieInput]),
    __metadata("design:returntype", Promise)
], MovieResolver.prototype, "addMovie", null);
__decorate([
    type_graphql_1.Mutation((_) => model_1.Movie),
    __param(0, type_graphql_1.Arg('id')),
    __param(1, type_graphql_1.Arg('MovieInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, input_1.UpdateMovieInput]),
    __metadata("design:returntype", Promise)
], MovieResolver.prototype, "updateMovie", null);
__decorate([
    type_graphql_1.Mutation((_) => Boolean),
    __param(0, type_graphql_1.Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MovieResolver.prototype, "deleteMovie", null);
MovieResolver = __decorate([
    typedi_1.Service(),
    type_graphql_1.Resolver(_ => model_1.Movie),
    __metadata("design:paramtypes", [service_1.MovieService])
], MovieResolver);
exports.MovieResolver = MovieResolver;
//# sourceMappingURL=resolver.js.map