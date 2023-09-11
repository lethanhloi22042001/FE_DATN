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
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },
      {
        name: "menu.admin.manage-doctor",
        link: "/system/manage-doctor",
      },
      {
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      }
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

export const doctorMenu = [
  {
    name: "menu.doctor.manage-schedule",
    menus: [
      {
        name: "menu.doctor.schedule",
        link: "/doctor/manage-schedule",
      }
    ],
  },
];
