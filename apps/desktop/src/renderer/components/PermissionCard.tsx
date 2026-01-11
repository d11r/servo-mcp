interface PermissionCardProps {
  name: string
  description: string
  granted: boolean
  onRequest: () => void
}

export function PermissionCard({ name, description, granted, onRequest }: PermissionCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className={`w-3 h-3 rounded-full ${
            granted ? 'bg-servo-green' : 'bg-servo-red'
          }`}
        />
        <div>
          <h3 className="font-medium text-sm">{name}</h3>
          <p className="text-xs text-gray-400">{description}</p>
        </div>
      </div>
      {!granted && (
        <button
          onClick={onRequest}
          className="px-3 py-1.5 text-xs font-medium bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
        >
          Grant
        </button>
      )}
      {granted && (
        <span className="text-xs text-servo-green font-medium">Granted</span>
      )}
    </div>
  )
}
