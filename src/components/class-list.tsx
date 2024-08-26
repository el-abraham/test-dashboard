'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ChartPie } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { getDetailClass } from "@/lib/utils"
import { Log } from "@/types/log"


type Props = {
  initialData: Log[],
  data: { name_class: string, id: string, count: number }[]
}

export function ClassList({ data, initialData }: Props) {
  console.log(data)
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Class</TableHead>

          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          data.map((cls, index) => {
            const detailClass = getDetailClass(initialData, cls.id)
            return (
              <TableRow key={index}>
                <TableCell className="font-medium">{cls.id}</TableCell>
                <TableCell>{cls.name_class}</TableCell>

                <TableCell className="text-right">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant={"outline"} size={"icon-sm"}>
                        <ChartPie className="w-4 h-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="sm:max-w-full w-[500px]">
                      <SheetHeader></SheetHeader>
                      <div>
                        <div>
                          <p className="text-foreground">{detailClass?.id_class}</p>
                          <p className="font-semibold text-xl">{detailClass?.name_class}</p>
                        </div>
                        <div className="mt-5 space-y-2">
                          <div>
                            <p>Overview</p>
                          </div>
                          <ChartContainer
                            config={{
                              activity: {
                                label: "Page Views",
                              },
                              total: {
                                label: "Total",
                                color: "hsl(var(--chart-1))",
                              },

                            }}
                            className="aspect-auto h-[250px] w-full"
                          >
                            <LineChart
                              accessibilityLayer
                              data={detailClass?.activity}
                              margin={{
                                left: 12,
                                right: 12,
                              }}
                            >
                              <CartesianGrid vertical={false} />
                              <XAxis
                                dataKey="time"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                minTickGap={32}
                                tickFormatter={(value) => {
                                  const date = new Date(value)
                                  return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                  })
                                }}
                              />
                              <ChartTooltip
                                content={
                                  <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="views"
                                    labelFormatter={(value) => {
                                      return new Date(value).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                      })
                                    }}
                                  />
                                }
                              />
                              <Line
                                dataKey={"total"}
                                type="monotone"
                                stroke={`var(--color-${"total"})`}
                                strokeWidth={2}
                                dot={false}
                              />
                            </LineChart>
                          </ChartContainer>
                        </div>

                        <div className="mt-10 space-y-2">
                          <div>
                            <p>Class Info</p>
                          </div>
                          <div className="space-y-3">
                            <div className="flex">
                              <div className="w-[200px]">Active users </div>
                              <p>: {detailClass?.total_active_user}</p>
                            </div>
                            <div className="flex">
                              <div className="w-[200px]">Total activity</div>
                              <p>: {detailClass?.total_activity}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </TableCell>
              </TableRow>
            )
          })
        }
      </TableBody>
    </Table>
  )
}