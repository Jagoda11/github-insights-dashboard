import React from 'react'
import { render, screen } from '@testing-library/react'

// Mock the `react-chartjs-2` library
jest.mock('react-chartjs-2', () => ({
  Bar: () => <div data-testid="chart">Mock Bar Chart</div>,
}))

import CommitFrequencyChart from './CommitFrequencyChart'

describe('CommitFrequencyChart', () => {
  it('renders the component without crashing', () => {
    const mockData = [
      { date: '2024-12-22', count: 5 },
      { date: '2024-12-23', count: 8 },
    ]

    render(<CommitFrequencyChart loading={false} commitData={mockData} />)

    // Verify the mock chart renders
    expect(screen.getByTestId('chart')).toBeTruthy()

    // Verify that the heading renders
    expect(screen.getByText('Commit Frequency')).toBeTruthy()
  })
})
