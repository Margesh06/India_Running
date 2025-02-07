import { Controller, Post, Body, Get, Query } from "@nestjs/common";
import { OrganiserService } from "./organiser.service";
import { CreateOrganiserDto } from "./organiser.dto";

@Controller("organisers")
export class OrganiserController {
  constructor(private readonly organiserService: OrganiserService) {}

  @Post("register")
  async register(@Body() data: CreateOrganiserDto) {
    return this.organiserService.registerOrganiser(data);
  }

  
  @Get("check-email")
  async checkEmail(@Query("email") email: string) {
    const exists = await this.organiserService.checkEmailExists(email);
    return { exists };
  }
}
