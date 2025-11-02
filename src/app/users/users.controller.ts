import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import type { CreateUserDto } from './dto/create-user.dto';
import { User as UserEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  // @Get('export')
  // @UseInterceptors(ExcelResponseInterceptor)
  // async exportUsers(
  //   @Query() exportUsersDto: ExportUsersDto,
  //   @Res() res: Response,
  // ) {
  //   const workbook = await this.usersService.exportUsers(exportUsersDto);
  //   await workbook.xlsx.write(res);
  //   res.end();
  //   return { message: 'Export success' };
  // }

  // @Post('import')
  // @UseInterceptors(FileInterceptor('file'))
  // importUsers(@UploadedFile() file: File, @User() user: UserInfo) {
  //   return this.usersService.importUsers({ file, user });
  // }

  // @Get()
  // @UsePipes(ParseParamsPaginationPipe)
  // getUsers(@Query() query: GetUsersPaginationDto) {
  //   return this.usersService.getUsers(query);
  // }

  // @Get('options')
  // getUserOptions(@Query() query: GetOptionsParams<UserEntity>) {
  //   return this.usersService.getOptions(query);
  // }

  @Get(':id')
  getUser(@Param('id') id: UserEntity['id']) {
    return this.usersService.getUser({ id });
  }

  // @Patch(':id')
  // updateUser(
  //   @Param('id') id: UserEntity['id'],
  //   @Body() updateUserDto: UpdateUserDto,
  // ) {
  //   return this.usersService.updateUser({
  //     data: updateUserDto,
  //     where: { id },
  //   });
  // }

  // @Delete(':id')
  // deleteUser(@Param('id') id: UserEntity['id']) {
  //   return this.usersService.deleteUser({ id });
  // }
}
