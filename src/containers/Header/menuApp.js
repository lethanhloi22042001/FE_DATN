export const adminMenu = [
  {
    //Quản lí người dùng
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.crud",
        link: "/system/admin/crud",
      },
      {
        // name: 'menu.admin.crud-redux', link:'/system/admin/crud-redux'.system/user-manage
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },
      {
        name: "menu.admin.manage-doctor",
        link: "/system/manage-doctor",
        // subMenus: [
        //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
        //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
        // ]
      },
      {
        name: "menu.admin.manage-admin",
        link: "/system/manage-admin",
      },
    ],
  },
  {
    //Phòng khám
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "/system/admin/manage-clinic",
      },
    ],
  },
  {
    //Chuyên Khoa
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.manage-specialty",
        link: "/system/admin/manage-specialty",
      },
    ],
  },
  {
    //Cẩm Nang
    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.manage-handbook",
        link: "/abc/xyz",
      },
    ],
  },
];
