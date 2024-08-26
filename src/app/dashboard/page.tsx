'use server'

import { getActivityDateCount, getAverageDailyActivity, getClassCount, getErrorUserCount, getGroupActivityByTime, getPeakActivity, getTotalActivity, readJsonFile } from "@/lib/utils-server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import DashboardLabel from "@/components/dashboard-label"
import { Separator } from "@/components/ui/separator"
import { OverallChart } from "@/components/overall-chart"
import ChartRangeActivity from "@/components/chart-range-activity"
import { ClassList } from "@/components/class-list"
import { redirect } from "next/navigation"
import { Log } from "@/types/log"


export default async function Dashboard() {

  const data = (await readJsonFile("202212-activity.json")) as Log[]

  const totalActivity = await getTotalActivity()
  const errorUserCount = await getErrorUserCount()
  const peakActivity = await getPeakActivity()
  const averageDailyActivity = await getAverageDailyActivity()

  const dataOverall = await getActivityDateCount()

  const groupActivityByTime = await getGroupActivityByTime()

  const dataClassList = await getClassCount()

  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  return (
    <div className="py-5 px-10">
      <h5 className="text-3xl font-semibold">Overview</h5>
      <div className="pt-5">

        <Separator />
        <div className="flex flex-col md:flex-row flex-wrap">
          <div className="w-full md:w-60 space-y-4 p-5 flex-0 md:border-r">
            <DashboardLabel label="Total Activity" value={totalActivity} />
            <DashboardLabel label="Average Daily Activity" value={averageDailyActivity} />
            <DashboardLabel label="Peak Activity" value={peakActivity} />
            <DashboardLabel label="Total User Errors" value={errorUserCount} />
          </div>

          <div className="flex-1 p-5">
            <div>
              <p className="font-semibold text-xl">Activity</p>
            </div>
            <OverallChart data={dataOverall} />
          </div>

          <div className="w-full md:w-80 p-5 md:border-l">
            <div>
              <p className="font-semibold text-xl"> Average Daily Activity</p>
            </div>
            <ChartRangeActivity data={groupActivityByTime} />
          </div>

        </div>

        <Separator />

        <ClassList initialData={data} data={dataClassList} />

        <Separator />

      </div>

    </div>
  )
}



