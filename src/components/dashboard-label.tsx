


export type Props = {
  label: string
  value: number
}

export default function DashboardLabel({ label, value }: Props) {
  return (
    <div className="">
      <p className="text-gray-400">{label}</p>
      <p className="font-semibold text-2xl">{value}</p>
    </div>
  )
}