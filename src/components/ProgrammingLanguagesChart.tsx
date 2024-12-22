import React from 'react'
import { Pie } from 'react-chartjs-2'

interface ProgrammingLanguagesChartProps {
  loading: boolean
  languageData: any
}

const ProgrammingLanguagesChart: React.FC<ProgrammingLanguagesChartProps> = ({
  loading,
  languageData,
}) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl mb-2">Programming Languages</h2>
      {loading || !languageData ? (
        <p>Loading...</p>
      ) : (
        <Pie data={languageData} />
      )}
    </div>
  )
}

export default ProgrammingLanguagesChart
