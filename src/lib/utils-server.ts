"use server"

import { Log } from '@/types/log';
import * as fs from 'fs';

// Fungsi untuk membaca dan menguraikan file JSON
export async function readJsonFile(filePath: string): Promise<Log[]> {
  // Membaca file secara sinkron
  const rawData = fs.readFileSync(filePath, 'utf-8');

  // Menguraikan data JSON
  const data = JSON.parse(rawData);

  return data;
}

export async function getTotalActivity(): Promise<number> {
  const data = (await readJsonFile("202212-activity.json"));
  return data.length;
}

export async function getActivityDateCount(): Promise<{ time: string, total: number }[]> {
  const data = (await readJsonFile("202212-activity.json"));

  const dateMap = new Map<string, number>();

  data.forEach(activity => {
    const date = activity.time.split(' ')[0];

    if (dateMap.has(date)) {
      dateMap.set(date, dateMap.get(date)! + 1);
    } else {
      dateMap.set(date, 1);
    }
  });

  return Array.from(dateMap.entries()).map(([time, total]) => ({ time, total }));
}

export async function getAverageDailyActivity(): Promise<number> {
  const data = await getActivityDateCount()

  return Math.floor(data.reduce((total, b) => total + b.total, 0) / data.length)
}

export async function getErrorUserCount(): Promise<number> {
  const data = (await readJsonFile("202212-activity.json"));

  return data.filter(d => d.email == "").length;
}

export async function getPeakActivity(): Promise<number> {
  const data = await getActivityDateCount()

  return data.reduce((max, current) => (current.total > max.total ? current : max)).total;
}


export async function getGroupActivityByTime(): Promise<{ time: string, average: number }[]> {
  const data = (await readJsonFile("202212-activity.json"));
  const timeRanges = [
    { label: "range1", start: 0, end: 6 },
    { label: "range2", start: 6, end: 12 },
    { label: "range3", start: 12, end: 18 },
    { label: "range4", start: 18, end: 24 }
  ];

  const activityCountPerRange = timeRanges.map(range => {
    const activitiesInRange = data.filter(activity => {
      const hour = new Date(activity.time).getHours();
      return hour >= range.start && hour < range.end;
    }).length;

    return {
      time: range.label,
      average: activitiesInRange
    };
  });

  // Hitung rata-rata per jam
  return activityCountPerRange.map(range => ({
    time: range.time,
    average: Math.floor(range.average / 31)
  }));
}

export async function getClassCount(): Promise<{ name_class: string, id: string, count: number }[]> {
  const data = (await readJsonFile("202212-activity.json"))
  const countMap: { [key: string]: { count: number, id: string } } = {};

  data.forEach(item => {
    if (countMap[item.name_class]) {
      countMap[item.name_class].count++;
    } else {
      if (!item.name_class) return
      countMap[item.name_class] = { count: 1, id: item.id_class };
    }
  });

  return Object.keys(countMap).map(name_class => ({
    name_class,
    id: countMap[name_class].id,
    count: countMap[name_class].count
  })).sort((a, b) => a.name_class.localeCompare(b.name_class));
}

