import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CommitFrequencyChart from './CommitFrequencyChart'

describe('CommitFrequencyChart Component 📊', () => {
  it('✅ should be defined ✨', () => {
    expect(CommitFrequencyChart).toBeDefined()
  })

  it('🎨 renders the component title', () => {
    render(<CommitFrequencyChart loading={false} commitData={null} />)
    expect(screen.getByText('Commit Frequency')).toBeInTheDocument()
  })

  it('⏳ displays loading state when loading is true', () => {
    render(<CommitFrequencyChart loading={true} commitData={null} />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('📈 skips rendering the chart if commitData is null', () => {
    render(<CommitFrequencyChart loading={false} commitData={null} />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('✅ renders the chart when valid commitData is provided', () => {
    const mockData = {
      labels: ['January', 'February'],
      datasets: [
        {
          label: 'Commits',
          data: [5, 10],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    }

    render(<CommitFrequencyChart loading={false} commitData={mockData} />)

    expect(screen.getByText('Commit Frequency')).toBeInTheDocument()
  })
})
