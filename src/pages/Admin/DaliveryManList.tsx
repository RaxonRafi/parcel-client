import { DeliveryPersonnelList } from "@/components/modules/Admin/DeliveryPersonnelList"
import { PendingPersonnelList } from "@/components/modules/Admin/PendingPersonnelsList"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const DeliveryManList = () => {
  return (
    <div className="flex justify-center">
      <Tabs defaultValue="approved" className="w-full max-w-4xl">
        <TabsList className="flex justify-center mb-4">
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>

        {/* Approved Tab */}
        <TabsContent value="approved">
          <Card>
            <CardHeader>
              <CardTitle>Approved Delivery Personnel</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <DeliveryPersonnelList />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pending Tab */}
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Delivery Personnel</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <PendingPersonnelList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default DeliveryManList
