'use client'
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart"


type Props = {
  data: { time: string, total: number }[]
}

export function OverallChart({ data }: Props) {
  return (
    <div>
      <ChartContainer
        config={{
          views: {
            label: "Activity",
          },
          total: {
            label: "Activity",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="aspect-auto h-[250px] w-full"
      >
        <BarChart
          accessibilityLayer
          data={data}
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
          <Bar dataKey={"total"} fill={`var(--color-${"total"})`} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}