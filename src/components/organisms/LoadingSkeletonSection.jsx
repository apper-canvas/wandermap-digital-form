import React from 'react'

const LoadingSkeletonSection = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <div className="h-8 bg-gray-200 rounded-lg w-48 mb-2 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
      </div>
      <div className="h-12 bg-gray-200 rounded-xl w-32 animate-pulse" />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl shadow-card overflow-hidden">
          <div className="h-48 bg-gray-200 animate-pulse" />
          <div className="p-5 space-y-3">
            <div className="h-6 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default LoadingSkeletonSection