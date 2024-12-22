import React, { useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import Loader from './Loader'

ChartJS.register(ArcElement, Tooltip, Legend)

interface ProgrammingLanguagesChartProps {
  loading: boolean
  languageData: any
}

const ProgrammingLanguagesChart: React.FC<ProgrammingLanguagesChartProps> = ({
  loading,
  languageData,
}) => {
  const [hiddenLegends, setHiddenLegends] = useState<boolean[]>([])

  if (!languageData?.labels) {
    return <Loader />
  }

  if (hiddenLegends.length === 0) {
    setHiddenLegends(Array(languageData.labels.length).fill(false))
  }

  const handleLegendClick = (index: number) => {
    const newHiddenLegends = [...hiddenLegends]
    newHiddenLegends[index] = !newHiddenLegends[index]
    setHiddenLegends(newHiddenLegends)
  }

  const chartData = {
    ...languageData,
    datasets: languageData.datasets.map((dataset: any) => ({
      ...dataset,
      data: dataset.data.map((value: number, index: number) =>
        hiddenLegends[index] ? 0 : value,
      ),
    })),
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Programming Languages</h2>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex justify-center items-center">
          <div className="w-64 h-64">
            <Pie data={chartData} options={options} />
          </div>
          <div className="ml-4">
            <ul>
              {languageData.labels.map((label: string, index: number) => (
                <li
                  key={index}
                  className={`flex items-center mb-2 cursor-pointer ${hiddenLegends[index] ? 'line-through opacity-50' : ''}`}
                  onClick={() => handleLegendClick(index)}
                >
                  <span
                    className="w-4 h-4 mr-2"
                    style={{
                      backgroundColor:
                        languageData.datasets[0].backgroundColor[index],
                    }}
                  ></span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProgrammingLanguagesChart
