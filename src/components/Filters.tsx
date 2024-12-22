import React from 'react'

interface FiltersProps {
  year: number
  handleYearChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const Filters: React.FC<FiltersProps> = ({ year, handleYearChange }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl mb-2">Filters</h2>
      <select
        value={year}
        onChange={handleYearChange}
        className="border p-2 rounded"
      >
        {[...Array(5)].map((_, i) => {
          const yearOption = new Date().getFullYear() - i
          return (
            <option key={yearOption} value={yearOption}>
              {yearOption}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default Filters
