export const sidebarMenu = [
  {
    link: "/a/dashboard",
    icon: "dashboard",
    theme: "outlined",
    label: "Dashboard",
    component: "",
    subMenu: false,
    subItems: []
  },
  {
    link: "/a/message",
    icon: "message",
    theme: "outlined",
    label: "Message",
    subMenu: false,
    subItems: []
  },
  {
    link: "/a/campaigns",
    icon: "rocket",
    theme: "outlined",
    label: "Campaigns",
    subMenu: false,
    subItems: []
  },
  {
    link: "/a/locations",
    icon: "environment",
    theme: "outlined",
    label: "Locations",
    subMenu: false,
    subItems: []
  },
  {
    link: "/a/history",
    icon: "clock-circle",
    theme: "outlined",
    label: "History",
    subMenu: true,
    subItems: [
      {
        link: "/a/history/messages",
        label: "Message"
      },
      {
        link: "/a/history/qr",
        label: "QR History"
      }
    ]
  }
];
