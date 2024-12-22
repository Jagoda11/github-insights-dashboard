import React from 'react'
import { Bar } from 'react-chartjs-2'

interface CommitFrequencyChartProps {
  loading: boolean
  commitData: any
}

const CommitFrequencyChart: React.FC<CommitFrequencyChartProps> = ({
  loading,
  commitData,
}) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl mb-2">Commit Frequency</h2>
      {loading || !commitData ? <p>Loading...</p> : <Bar data={commitData} />}
    </div>
  )
}

export default CommitFrequencyChart
