"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateBookingDto = void 0;
// src/bookings/dto/update-booking.dto.ts
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var create_booking_dto_1 = require("./create-booking.dto");
var booking_status_enum_1 = require("../enums/booking-status.enum");
var UpdateBookingDto = /** @class */ (function (_super) {
    __extends(UpdateBookingDto, _super);
    function UpdateBookingDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        swagger_1.ApiProperty({
            description: 'Status of the booking',
            "enum": booking_status_enum_1.BookingStatus,
            example: booking_status_enum_1.BookingStatus.CONFIRMED,
            required: false
        }),
        class_validator_1.IsEnum(booking_status_enum_1.BookingStatus),
        class_validator_1.IsOptional()
    ], UpdateBookingDto.prototype, "status");
    return UpdateBookingDto;
}(swagger_1.PartialType(create_booking_dto_1.CreateBookingDto)));
exports.UpdateBookingDto = UpdateBookingDto;
