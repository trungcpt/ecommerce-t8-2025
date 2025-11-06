import { Injectable } from '@nestjs/common';
import { ExportUserVendorRolesDto } from './dto/get-user-vendor-role.dto';
import { ImportUserVendorRolesDto } from './dto/create-user-vendor-role.dto';
import { PrismaBaseService } from '../../common/services/prisma-base.service';
import { UserVendorRole } from './entities/user-vendor-role.entity';
import { PrismaService } from '../../common/prisma/prisma.service';
import { ExcelUtilService } from '../../common/utils/excel-util/excel-util.service';
import { Prisma } from '@prisma/client';
import { RolesService } from '../roles/roles.service';
import { UsersService } from '../users/users.service';
import { VendorsService } from '../vendors/vendors.service';

@Injectable()
export class UserVendorRolesService extends PrismaBaseService<'userVendorRole'> {
  private userVendorRoleEntityName = UserVendorRole.name;
  private excelSheets = {
    [this.userVendorRoleEntityName]: this.userVendorRoleEntityName,
  };
  constructor(
    public prismaService: PrismaService,
    private excelUtilService: ExcelUtilService,
    private usersService: UsersService,
    private rolesService: RolesService,
    private vendorsService: VendorsService,
  ) {
    super(prismaService, 'userVendorRole');
  }

  get client() {
    return super.client;
  }

  get extended() {
    return super.extended;
  }

  async exportUserVendorRoles(params: ExportUserVendorRolesDto) {
    const { userIDs, roleIDs, vendorIDs } = params ?? {};
    const where: Prisma.UserVendorRoleWhereInput = {};

    if (userIDs) {
      where.userID = { in: userIDs };
    }

    if (vendorIDs) {
      where.vendorID = { in: vendorIDs };
    }

    if (roleIDs) {
      where.roleID = { in: roleIDs };
    }

    const userVendorRoles = await this.extended.export({
      select: {
        user: {
          select: {
            email: true,
          },
        },
        vendor: {
          select: {
            name: true,
          },
        },
        role: {
          select: {
            name: true,
          },
        },
      },
      where,
    });

    const data = this.excelUtilService.generateExcel({
      worksheets: [
        {
          sheetName: this.excelSheets[this.userVendorRoleEntityName],
          fieldsExclude: ['createdAt', 'createdBy', 'status', 'id'],
          data: userVendorRoles.map(({ user, role, vendor }) => ({
            userEmail: user.email,
            vendorName: vendor.name,
            roleName: role.name,
          })),
        },
      ],
    });

    return data;
  }

  async importUserVendorRoles({ file, user }: ImportUserVendorRolesDto) {
    const userVendorRoleSheetName =
      this.excelSheets[this.userVendorRoleEntityName];
    const dataCreated = await this.excelUtilService.read(file);
    const dataImport = dataCreated[userVendorRoleSheetName];

    const idsMapping = dataImport.map(
      ({ userId: userID, roleId: roleID, vendorId: vendorID }) => ({
        userID,
        roleID,
        vendorID,
      }),
    );

    await this.extended.deleteMany({
      where: { OR: idsMapping },
    });

    const data = await this.extended.createMany({
      data: idsMapping.map((item) => ({ ...item, user })),
    });
    return data;
  }

  async getUserVendorRoles() {
    const data = await this.extended.findMany({
      select: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
        vendor: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
        role: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    });

    return data;
  }
}
