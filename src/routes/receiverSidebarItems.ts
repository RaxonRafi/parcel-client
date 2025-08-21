import Parcel from "@/pages/Parcel/Parcel";
import type { ISidebarItem } from "@/types";

export const receiverSidebarItems: ISidebarItem[] = [
    {
      title: "Dashboard",
      items: [
        {
          title: "Parcel",
          url: "/receiver/parcel",
          Component:Parcel
        },
      ],
    },

]