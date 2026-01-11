interface StatusIndicatorProps {
  ready: boolean
}

export function StatusIndicator({ ready }: StatusIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-2 h-2 rounded-full ${
          ready ? 'bg-servo-green animate-pulse' : 'bg-servo-yellow'
        }`}
      />
      <span className={`text-xs font-medium ${ready ? 'text-servo-green' : 'text-servo-yellow'}`}>
        {ready ? 'Ready' : 'Setup Required'}
      </span>
    </div>
  )
}
