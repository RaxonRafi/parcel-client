import { role } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { pendingSidebarItems } from "@/routes/pendingSidebarItems";
import { receiverSidebarItems } from "@/routes/receiverSidebarItems";
import { senderSidebarItems } from "@/routes/senderSidebarItems";
import type { TRole } from "@/types";



export const getSidebarItems = (userRole: TRole) =>{
    switch(userRole){
        case role.admin:
            return [...adminSidebarItems];
        case role.sender:
            return [...senderSidebarItems];
        case role.receiver:
            return [...receiverSidebarItems]
        case role.pending_delivery:
            return [...pendingSidebarItems]
        default:
            return [];

    }
}