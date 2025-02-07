import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Organiser } from "../entities/organiser.entity";
import { CreateOrganiserDto } from "./organiser.dto";

@Injectable()
export class OrganiserService {
  constructor(
    @InjectRepository(Organiser)
    private readonly organiserRepository: Repository<Organiser>
  ) {}

  async registerOrganiser(data: CreateOrganiserDto): Promise<Organiser> {
    const organiser = this.organiserRepository.create(data);
    return this.organiserRepository.save(organiser);
  }

  async getAllOrganisers(): Promise<Organiser[]> {
    return this.organiserRepository.find();
  }
  async checkEmailExists(email: string): Promise<boolean> {
    const organiser = await this.organiserRepository.findOne({ where: { email } });
    console.log(organiser);
    return !!organiser;
  }
  
}
