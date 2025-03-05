import { BookingEntity } from "../entities/booking_entity";
import { Booking } from "../../../domain/entities/booking";
import { BookingMapper } from "./booking_mapper";
import { Property } from "../../../domain/entities/property";
import { DateRange } from "../../../domain/value_objects/date_range";
import { User } from "../../../domain/entities/user";

describe("BookingMapper", () => {
    it("deve converter BookingEntity em Booking corretamente", async () => {
        // Arrange
        let persistence: BookingEntity = {
            id: "46",
            startDate: new Date("2024-12-10"),
            endDate: new Date("2024-12-25"),
            guestCount: 20,
            status: "CONFIRMED",
            totalPrice: 500,
            guest: {
                id: "1",
                name: "Elias"
            },
            property: {
                id: "1",
                name: "José",
                description: "Casa do José",
                maxGuests: 20,
                basePricePerNight: 50,
                bookings: []
            }
        };

        // Act
        var convert2domain = BookingMapper.toDomain(persistence)

        // Assert
        expect(convert2domain).not.toBeNull();
        expect(convert2domain?.getId()).toBe(persistence.id);
        expect(convert2domain?.getDateRange()?.getStartDate()).toBe(persistence.startDate);
        expect(convert2domain?.getDateRange()?.getEndDate()).toBe(persistence.endDate);
        expect(convert2domain?.getGuestCount()).toBe(persistence.guestCount);
        expect(convert2domain?.getStatus()).toBe(persistence.status);
        expect(convert2domain?.getTotalPrice()).toBe(persistence.totalPrice);

        expect(convert2domain?.getGuest()?.getId()).toBe(persistence.guest.id);
        expect(convert2domain?.getGuest()?.getName()).toBe(persistence.guest.name);

        expect(convert2domain?.getProperty()?.getId()).toBe(persistence.property.id);
        expect(convert2domain?.getProperty()?.getName()).toBe(persistence.property.name);
        expect(convert2domain?.getProperty()?.getDescription()).toBe(persistence.property.description);
        expect(convert2domain?.getProperty()?.getMaxGuests()).toBe(persistence.property.maxGuests);
        expect(convert2domain?.getProperty()?.getBasePricePerNight()).toBe(persistence.property.basePricePerNight);
    });

    it("deve lançar erro de validação ao faltar campos obrigatórios no BookingEntity", async () => {
        // Arrange
        let entity2Test: BookingEntity = {
            id: "46",
            startDate: new Date("2024-12-10"),
            endDate: new Date("2024-12-15"),
            guestCount: 20,
            status: "CONFIRMED",
            totalPrice: 500,
            guest: {
                id: "1",
                name: "Elias"
            },
            property: {
                id: "1",
                name: "José",
                description: "Casa do José",
                maxGuests: 20,
                basePricePerNight: 50,
                bookings: []
            }
        };

        let entity2TestGuestCount = { ...entity2Test, guestCount: 0 };

        // Act & Assert
        expect(() => {
            BookingMapper.toDomain(entity2TestGuestCount);
        }).toThrow("O número de hóspedes deve ser maior que zero.");
    });

    it("deve converter Booking para BookingEntity corretamente", async () => {
        // Arrange
        let property = new Property("46", "Elias", "Descrição", 200, 10);
        let guestUser = new User("1", "Luís");
        let dateRange = new DateRange(new Date("2024-12-20"), new Date("2024-12-25"));
        let domain: Booking = new Booking("1", property, guestUser, dateRange, 15);
        // Act
        var convert2persistence = BookingMapper.toPersistence(domain)

        // Assert
        expect(convert2persistence).not.toBeNull();
        expect(convert2persistence?.id).toBe(domain.getId());
        expect(convert2persistence?.startDate).toBe(dateRange.getStartDate());
        expect(convert2persistence?.endDate).toBe(dateRange.getEndDate());
        expect(convert2persistence?.guestCount).toBe(domain.getGuestCount());

        expect(convert2persistence?.property?.id).toBe(property.getId());
        expect(convert2persistence?.property?.name).toBe(property.getName());
        expect(convert2persistence?.property?.description).toBe(property.getDescription());
        expect(convert2persistence?.property?.maxGuests).toBe(property.getMaxGuests());
        expect(convert2persistence?.property?.basePricePerNight).toBe(property.getBasePricePerNight());

        expect(convert2persistence?.guest?.id).toBe(guestUser.getId());
        expect(convert2persistence?.guest?.name).toBe(guestUser.getName());
    });
});