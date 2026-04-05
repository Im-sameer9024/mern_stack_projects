import React from 'react'
import { Skeleton } from '../ui/skeleton'

const ExpenseFormSkeleton = () => {
  return (
    <div className="p-6 bg-white rounded-lg w-full max-w-md space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-5 w-5 rounded-full" />
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-border" />

      {/* Income Source */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>

      {/* Amount */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>

      {/* Date */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <div className="relative">
          <Skeleton className="h-12 w-full rounded-lg" />
          <Skeleton className="absolute right-3 top-3 h-5 w-5 rounded" />
        </div>
      </div>

      {/* Button */}
      <Skeleton className="h-12 w-full rounded-lg" />
    </div>
  )
}

export default ExpenseFormSkeleton