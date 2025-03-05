import { Request, Response } from "express";
import { UserService } from "../../application/services/user_service";
import { CreateUserDTO } from "../../application/dtos/create_user_dto";


export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }


    async createUser(req: Request, res: Response): Promise<Response> {
        try {
            let name = req.body.name;
            if (!name) {
                return res
                    .status(400)
                    .json({ message: "O campo nome é obrigatório." });
            }

            const dto: CreateUserDTO = {
                name: req.body.name,
            };

            let user = await this.userService.CreateUser(dto);

            return res.status(201).json({
                message: "User created successfully",
                user: user
            });
        } catch (error: any) {
            return res
                .status(400)
                .json({ message: error.message || "An unexpected error occurred" });
        }
    }
}