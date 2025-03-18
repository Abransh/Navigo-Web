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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// Backend/src/database/seed.ts
var core_1 = require("@nestjs/core");
var app_module_1 = require("../app.module");
var common_1 = require("@nestjs/common");
var user_role_enum_1 = require("../users/enums/user-role.enum");
var bcrypt = require("bcrypt");
var logger = new common_1.Logger('Seed');
function bootstrap() {
    return __awaiter(this, void 0, void 0, function () {
        var app, userRepository, destinationRepository, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, core_1.NestFactory.createApplicationContext(app_module_1.AppModule)];
                case 1:
                    app = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, 6, 8]);
                    userRepository = app.get('UserRepository');
                    destinationRepository = app.get('DestinationRepository');
                    // Seed admin user
                    return [4 /*yield*/, seedAdminUser(userRepository)];
                case 3:
                    // Seed admin user
                    _a.sent();
                    // Seed destinations
                    return [4 /*yield*/, seedDestinations(destinationRepository)];
                case 4:
                    // Seed destinations
                    _a.sent();
                    logger.log('Seeding completed!');
                    return [3 /*break*/, 8];
                case 5:
                    error_1 = _a.sent();
                    logger.error('Error during seeding:', error_1);
                    return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, app.close()];
                case 7:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function seedAdminUser(userRepository) {
    return __awaiter(this, void 0, void 0, function () {
        var adminEmail, existingAdmin, password, hashedPassword, adminUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@navigo.com';
                    return [4 /*yield*/, userRepository.findOne({ where: { email: adminEmail } })];
                case 1:
                    existingAdmin = _a.sent();
                    if (existingAdmin) {
                        logger.log('Admin user already exists');
                        return [2 /*return*/];
                    }
                    password = process.env.SEED_ADMIN_PASSWORD || 'admin_password';
                    return [4 /*yield*/, bcrypt.hash(password, 10)];
                case 2:
                    hashedPassword = _a.sent();
                    adminUser = userRepository.create({
                        firstName: 'Admin',
                        lastName: 'User',
                        email: adminEmail,
                        password: hashedPassword,
                        role: user_role_enum_1.UserRole.ADMIN,
                        isVerified: true,
                        isActive: true
                    });
                    return [4 /*yield*/, userRepository.save(adminUser)];
                case 3:
                    _a.sent();
                    logger.log("Admin user created: " + adminEmail);
                    return [2 /*return*/];
            }
        });
    });
}
function seedDestinations(destinationRepository) {
    return __awaiter(this, void 0, void 0, function () {
        var count, destinations, _i, destinations_1, destination;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, destinationRepository.count()];
                case 1:
                    count = _a.sent();
                    if (count > 0) {
                        logger.log('Destinations already seeded');
                        return [2 /*return*/];
                    }
                    destinations = [
                        {
                            name: 'VARANASI',
                            slug: 'varanasi',
                            description: 'Varanasi, also known as Benares or Kashi, is one of the oldest continuously inhabited cities in the world. It is a major religious hub in India and is regarded as one of the seven holy cities in Hinduism.',
                            image: '/images/Varanasi1.jpg',
                            highlights: [
                                'Witness the spiritual Ganga Aarti ceremony at Dashashwamedh Ghat',
                                'Explore the ancient ghats along the River Ganges',
                                'Visit the sacred Kashi Vishwanath Temple',
                                'Experience sunrise boat ride on the Ganges',
                            ],
                            attractions: [
                                {
                                    name: 'Dashashwamedh Ghat',
                                    description: 'The main ghat in Varanasi where the spectacular Ganga Aarti is performed every evening.',
                                    image: '/images/varanasi-dashashwamedh-ghat.jpg'
                                },
                                {
                                    name: 'Kashi Vishwanath Temple',
                                    description: 'One of the most famous Hindu temples dedicated to Lord Shiva, located on the western bank of the holy river Ganga.',
                                    image: '/images/varanasi-kashi-vishwanath.jpg'
                                },
                            ]
                        },
                        {
                            name: 'GOA',
                            slug: 'goa',
                            description: 'Goa is a state on the southwestern coast of India within the region known as the Konkan. It is India\'s smallest state by area and the fourth-smallest by population, famous for its beaches, nightlife, and architecture.',
                            image: '/images/Goa.jpg',
                            highlights: [
                                'Relax on beautiful beaches like Baga, Calangute, and Anjuna',
                                'Explore Old Goa\'s Portuguese colonial architecture',
                                'Experience vibrant nightlife and beach parties',
                                'Try delicious Goan cuisine with fresh seafood',
                            ],
                            attractions: [
                                {
                                    name: 'Calangute Beach',
                                    description: 'One of the largest and most popular beaches in North Goa, known as the "Queen of Beaches".',
                                    image: '/images/goa-calangute.jpg'
                                },
                                {
                                    name: 'Basilica of Bom Jesus',
                                    description: 'UNESCO World Heritage Site and one of the best examples of baroque architecture in India.',
                                    image: '/images/goa-basilica.jpg'
                                },
                            ]
                        },
                        {
                            name: 'NEW DELHI',
                            slug: 'new-delhi',
                            description: 'New Delhi is the capital of India and a part of the National Capital Territory of Delhi. It houses important government buildings, embassies, and cultural institutions.',
                            image: '/images/NewDelhi.jpg',
                            highlights: [
                                'Visit the iconic Red Fort, a UNESCO World Heritage Site',
                                'Explore Humayun\'s Tomb and its beautiful gardens',
                                'Experience the grandeur of Qutub Minar complex',
                                'Shop at vibrant markets like Chandni Chowk',
                            ],
                            attractions: [
                                {
                                    name: 'Red Fort',
                                    description: 'A historic fort that served as the main residence of the Mughal Emperors, built in 1639.',
                                    image: '/images/delhi-red-fort.jpg'
                                },
                                {
                                    name: 'India Gate',
                                    description: 'A war memorial dedicated to the soldiers of the British Indian Army who died in the First World War.',
                                    image: '/images/delhi-india-gate.jpg'
                                },
                            ]
                        },
                        {
                            name: 'JAIPUR',
                            slug: 'jaipur',
                            description: 'Jaipur is the capital of the Indian state of Rajasthan, known as the "Pink City" due to the distinctive color of its buildings. It is part of the popular Golden Triangle tourist circuit.',
                            image: '/images/Jaipur.jpg',
                            highlights: [
                                'Explore the magnificent Amber Fort',
                                'Visit the City Palace complex',
                                'See the unique Hawa Mahal (Palace of Winds)',
                                'Experience traditional Rajasthani culture and cuisine',
                            ],
                            attractions: [
                                {
                                    name: 'Amber Fort',
                                    description: 'A majestic fort overlooking Maota Lake, known for its artistic style elements and elaborate mirror work.',
                                    image: '/images/jaipur-amber-fort.jpg'
                                },
                                {
                                    name: 'Hawa Mahal',
                                    description: 'A palace with a unique five-story exterior that resembles a honeycomb with its 953 small windows.',
                                    image: '/images/jaipur-hawa-mahal.jpg'
                                },
                            ]
                        },
                    ];
                    _i = 0, destinations_1 = destinations;
                    _a.label = 2;
                case 2:
                    if (!(_i < destinations_1.length)) return [3 /*break*/, 5];
                    destination = destinations_1[_i];
                    return [4 /*yield*/, destinationRepository.save(destinationRepository.create(destination))];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    logger.log(destinations.length + " destinations seeded successfully");
                    return [2 /*return*/];
            }
        });
    });
}
bootstrap();
