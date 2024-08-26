'use client'
import { Label, Pie, PieChart } from "recharts"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "./ui/chart"


type Props = {
  data: { time: string, average: number }[]
}

export default function ChartRangeActivity({ data }: Props) {
  return (
    <div>
      <ChartContainer
        config={{
          activity: {
            label: "Activity",
          },
          range1: {
            label: "00 - 06",
            color: "hsl(var(--chart-1))",
          },
          range2: {
            label: "06 - 12",
            color: "hsl(var(--chart-2))",
          },
          range3: {
            label: "12 - 18",
            color: "hsl(var(--chart-3))",
          },
          range4: {
            label: "18 - 24",
            color: "hsl(var(--chart-4))",
          },
        }}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={data.map((v) => { return { ...v, fill: "var(--color-" + v.time + ")" } })}
            dataKey="average"
            nameKey="time"
            innerRadius={60}
            strokeWidth={5}
          >
          </Pie>
          <ChartLegend
            content={<ChartLegendContent nameKey="time" />}
            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
          />
        </PieChart>
      </ChartContainer>
    </div>
  )
}