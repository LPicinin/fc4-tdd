import { Property } from "../../../domain/entities/property";
import { PropertyEntity } from "../entities/property_entity";
import { PropertyMapper } from "./property_mapper"


describe("PropertyMapper", () => {
    it("deve converter PropertyEntity em Property corretamente", async () => {
        // Arrange
        let persistence: PropertyEntity = {
            id: "46",
            name: "Elias",
            description: "Descrição",
            basePricePerNight: 10,
            maxGuests: 20,
            bookings: []
        };

        // Act
        var convert2domain = PropertyMapper.toDomain(persistence);

        // Assert
        expect(convert2domain).not.toBeNull();
        expect(convert2domain?.getId()).toBe(persistence.id);
        expect(convert2domain?.getName()).toBe(persistence.name);
        expect(convert2domain?.getDescription()).toBe(persistence.description);
        expect(convert2domain?.getBasePricePerNight()).toBe(persistence.basePricePerNight);
        expect(convert2domain?.getMaxGuests()).toBe(persistence.maxGuests);
    });

    it("deve lançar erro de validação ao faltar campos obrigatórios no PropertyEntity", async () => {
        // Arrange
        let entity2TestName: PropertyEntity = {
            id: "46",
            name: "",
            description: "Descrição",
            basePricePerNight: 10,
            maxGuests: 20,
            bookings: []
        };

        let entity2TestMaxGuests = {...entity2TestName, name: "Elias", maxGuests: 0}

        // Act & Assert
        expect(() => {
            PropertyMapper.toDomain(entity2TestName);
        }).toThrow("O nome é obrigatório");

        expect(() => {
            PropertyMapper.toDomain(entity2TestMaxGuests);
        }).toThrow("O número máximo de hóspedes deve ser maior que zero");

    });

    it("deve converter Property para PropertyEntity corretamente", async () => {
        // Arrange
        const domain = new Property("46", "Elias", "Descrição", 20, 10);

        // Act
        var convert2persistence = PropertyMapper.toPersistence(domain)

        // Assert
        expect(convert2persistence).not.toBeNull();
        expect(convert2persistence?.id).toBe(domain.getId());
        expect(convert2persistence?.name).toBe(domain.getName());
        expect(convert2persistence?.description).toBe(domain.getDescription());
        expect(convert2persistence?.basePricePerNight).toBe(domain.getBasePricePerNight());
        expect(convert2persistence?.maxGuests).toBe(domain.getMaxGuests());
    });
});