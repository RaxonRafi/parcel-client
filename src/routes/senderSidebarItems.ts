import SenderParcels from "@/pages/Parcel/SenderParcels";
import type { ISidebarItem } from "@/types";

export const senderSidebarItems: ISidebarItem[] = [
    {
      title: "Dashboard",
      items: [
        {
          title: "Parcel",
          url: "/sender/parcel",
          Component:SenderParcels
        },
      ],
    },

]