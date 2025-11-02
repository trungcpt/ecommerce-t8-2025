import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { PrismaBaseService } from '../../common/services/prisma-base.service';
import { PrismaService } from '../../common/prisma/prisma.service';
import { IsExistPermissionKeyDto } from './dto/get-user.dto';
@Injectable()
// implements Options<User>
export class UsersService extends PrismaBaseService<'user'> {
  private userEntityName = User.name;
  constructor(
    // private excelUtilService: ExcelUtilService,
    public prismaService: PrismaService,
    // private paginationUtilService: PaginationUtilService,
    // private queryUtil: QueryUtilService,
  ) {
    super(prismaService, 'user');
  }

  get client() {
    // this.prismaService.user
    return super.client;
  }

  // get extended() {
  //   return super.extended;
  // }

  async getUser(where: Prisma.UserWhereUniqueInput) {
    const data = await this.client.findUnique({
      where,
    });
    return data;
  }

  // async getUsers({ page, itemPerPage }: GetUsersPaginationDto) {
  //   // const usersCacheKey = this.getUsers.name;
  //   // const usersCached = await this.cacheManager.get(usersCacheKey);
  //   // if (usersCached) return usersCached;

  //   const totalItems = await this.client.count();
  //   const paging = this.paginationUtilService.paging({
  //     page,
  //     itemPerPage,
  //     totalItems,
  //   });
  //   const list = await this.client.findMany({
  //     skip: paging.skip,
  //     take: itemPerPage,
  //   });

  //   const data = paging.format(list);
  //   // await this.cacheManager.set(usersCacheKey, data);
  //   return data;
  // }

  async createUser(createUserDto: CreateUserDto) {
    const data = await this.client.create({
      data: createUserDto,
    });
    return data;
  }

  // async updateUser(params: {
  //   where: Prisma.UserWhereUniqueInput;
  //   data: UpdateUserDto;
  // }) {
  //   const { where, data: dataUpdate } = params;
  //   const data = await this.client.update({
  //     data: dataUpdate,
  //     where,
  //   });
  //   return data;
  // }

  // async deleteUser(where: Prisma.UserWhereUniqueInput) {
  //   // const data = await this.client.delete({
  //   //   where,
  //   // });
  //   const data = await this.client.softDelete(where);
  //   return data;
  // }

  // async getOptions(params: GetOptionsParams<User>) {
  //   const { limit, select, ...searchFields } = params;
  //   const fieldsSelect = this.queryUtil.convertFieldsSelectOption(select);
  //   const data = await this.client.findMany({
  //     select: fieldsSelect,
  //     where: {
  //       ...searchFields,
  //     },
  //     take: limit,
  //   });
  //   return data;
  // }

  // async exportUsers({ ids }: ExportUsersDto) {
  //   const users = await this.client.export({
  //     where: {
  //       id: { in: ids },
  //     },
  //   });

  //   const data = this.excelUtilService.generateExcel({
  //     worksheets: [
  //       {
  //         sheetName: this.excelSheets[this.userEntityName],
  //         data: users,
  //       },
  //     ],
  //   });

  //   return data;
  // }

  // async importUsers({ file, user }: ImportUsersDto) {
  //   const userSheetName = this.excelSheets[this.userEntityName];
  //   const dataCreated = await this.excelUtilService.read(file);
  //   const data = await this.client.createMany({
  //     data: dataCreated[userSheetName].map((item) => ({
  //       ...item,
  //       user,
  //     })),
  //   });
  //   return data;
  // }

  async isSupperAdmin(userID: User['id']) {
    return true;
    // const data = await this.client.findFirst({
    //   where: {
    //     id: userID,
    //     userVendorRoles: {
    //       some: {
    //         role: {
    //           isSystemRole: true,
    //         },
    //       },
    //     },
    //   },
    // });
    // return data ? true : false;
  }

  async isExistPermissionKey({
    userID,
    permissionKey,
  }: IsExistPermissionKeyDto) {
    return true;
    // const user = await this.client.findFirst({
    //   include: {
    //     userVendorRoles: {
    //       select: {
    //         role: {
    //           select: {
    //             rolePermissions: {
    //               select: {
    //                 permission: {
    //                   select: {
    //                     key: true,
    //                   },
    //                 },
    //               },
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    //   where: {
    //     id: userID,
    //     userVendorRoles: {
    //       some: { status: VendorStatus.active },
    //     },
    //   },
    // });
    // if (!user) return false;

    // const [route] = permissionKey.split('_');
    // const isExistPermission = user.userVendorRoles?.some((item) =>
    //   item.role?.rolePermissions?.some(
    //     (rp) =>
    //       rp.permission?.key?.includes(permissionKey) ||
    //       rp.permission?.key?.includes(`${route}_[${Actions.MANAGE}]`),
    //   ),
    // );

    // return isExistPermission ? true : false;
  }
}
