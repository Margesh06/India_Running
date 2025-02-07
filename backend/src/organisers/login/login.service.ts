import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Organiser } from "../../entities/organiser.entity";
import { LoginDto } from "./login.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Organiser)
    private readonly organiserRepository: Repository<Organiser>,
    private readonly jwtService: JwtService
  ) {}

  async validateOrganiser(loginDto: LoginDto) {
    const { email } = loginDto;
    
    const organiser = await this.organiserRepository.findOne({ where: { email } });
    if (!organiser) {
      throw new UnauthorizedException("Email not found");
    }

    const payload = { id: organiser.id, email: organiser.email, organizationName: organiser.organizationName };
    const token = this.jwtService.sign(payload);

    return { message: "Login successful", token };
  }
}
