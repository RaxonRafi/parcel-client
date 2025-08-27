import IncomingParcel from "@/pages/Parcel/IncomingParcel";

import type { ISidebarItem } from "@/types";

export const receiverSidebarItems: ISidebarItem[] = [
    {
      title: "Dashboard",
      items: [
        {
          title: "Parcel",
          url: "/receiver/parcel",
          Component:IncomingParcel
        },
      ],
    },

]