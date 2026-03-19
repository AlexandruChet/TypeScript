"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = exports.users = void 0;
exports.users = [
    { id: 1, name: "Alex", role: "ADMIN", isBlocked: false, notes: [], adminLevel: 3, warnings: "OK", adminPassword: "123123" },
    { id: 2, name: "Brad", role: "USER", isBlocked: false, notes: [] },
    { id: 3, name: "Felix", role: "USER", isBlocked: true, notes: [] }
];
class UserRepository {
    async getById(id) {
        return exports.users.find((u) => u.id === id) ?? null;
    }
}
exports.UserRepository = UserRepository;
