import express from "express";
import request from "supertest";
import { DataSource } from "typeorm";
import { PropertyEntity } from "../persistence/entities/property_entity";
import { PropertyService } from "../../application/services/property_service";
import { TypeORMPropertyRepository } from "../repositories/typeorm_property_repository";
import { PropertyController } from "./property_controller";
import { BookingEntity } from "../persistence/entities/booking_entity";
import { UserEntity } from "../persistence/entities/user_entity";

const app = express();
app.use(express.json());

let dataSource: DataSource;
let repository: TypeORMPropertyRepository;
let service: PropertyService;
let controller: PropertyController;

beforeAll(async () => {
    dataSource = new DataSource({
        type: "sqlite",
        database: ":memory:",
        dropSchema: true,
        entities: [UserEntity, BookingEntity, PropertyEntity],
        synchronize: true,
        logging: false,
    });

    await dataSource.initialize();

    repository = new TypeORMPropertyRepository(
        dataSource.getRepository(PropertyEntity)
    );

    service = new PropertyService(repository);
    controller = new PropertyController(service);

    app.post("/properties", (req, res, next) => {
        controller.createProperty(req, res).catch((err) => next(err));
    });
});

afterAll(async () => {
    await dataSource.destroy();
});

describe("PropertyController", () => {
    beforeAll(async () => {
        const propertyRepo = dataSource.getRepository(PropertyEntity);
        await propertyRepo.clear();
    });

    it("deve criar uma propriedade com sucesso", async () => {
        const response = await request(app).post("/properties").send({
            name: "Residencial jardim I",
            description: "Casa de condomínio",
            maxGuests: 3,
            basePricePerNight: 200
        });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Property created successfully");
        expect(response.body.property).toHaveProperty("id");
    });

    it("deve retornar erro com código 400 e mensagem 'O nome da propriedade é obrigatório.' ao enviar um nome vazio", async () => {
        const response = await request(app).post("/properties").send({
            name: "",
            description: "Casa de condomínio",
            maxGuests: 3,
            basePricePerNight: 200
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("O nome da propriedade é obrigatório.");
        expect(response.body).not.toHaveProperty("property");
    });

    it("deve retornar erro com código 400 e mensagem 'A capacidade máxima deve ser maior que zero.' ao enviar maxGuests igual a zero ou negativo", async () => {
        const response = await request(app).post("/properties").send({
            name: "Residencial jardim I",
            description: "Casa de condomínio",
            maxGuests: -2,
            basePricePerNight: 200
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("A capacidade máxima deve ser maior que zero.");
        expect(response.body).not.toHaveProperty("property");
    });

    it("deve retornar erro com código 400 e mensagem 'O preço base por noite é obrigatório.' ao enviar basePricePerNight ausente", async () => {
        const response = await request(app).post("/properties").send({
            name: "Residencial jardim I",
            description: "Casa de condomínio",
            maxGuests: 2
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("O preço base por noite é obrigatório.");
        expect(response.body).not.toHaveProperty("property");
    });
});