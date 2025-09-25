import SubmitNid from "@/pages/SubmitNid";
import type { ISidebarItem } from "@/types";




export const pendingSidebarItems: ISidebarItem[] = [
    {
      title: "Dashboard",
      items: [
        {
          title: "Verify",
          url: "/pending-delivery-man/submit-nid",
          Component:SubmitNid
        },
      ],
    },

]