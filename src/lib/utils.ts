import { Log } from "@/types/log";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getDetailClass(data: Log[], id_class: string) {
  const filteredData = data.filter(activity => activity.id_class === id_class);

  if (filteredData.length === 0) {
    return null;
  }

  const name_class = filteredData[0].name_class;

  const activityMap = new Map<string, number>();
  const userSet = new Set<string>();

  filteredData.forEach(activity => {
    const date = activity.time.split(' ')[0];
    userSet.add(activity.email);

    if (activityMap.has(date)) {
      activityMap.set(date, activityMap.get(date)! + 1);
    } else {
      activityMap.set(date, 1);
    }
  });

  const activity: { time: string, total: number }[] = Array.from(activityMap, ([time, total]) => ({ time, total }));

  const total_activity = filteredData.length;
  const total_active_user = userSet.size;

  return {
    id_class,
    name_class,
    activity,
    total_active_user,
    total_activity
  };


}