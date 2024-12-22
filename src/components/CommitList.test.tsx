import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CommitList from './CommitList'

describe('CommitList Component 🎉', () => {
  it('✅ should be defined ✨', () => {
    expect(CommitList).toBeDefined()
  })

  it('🎨 renders the component correctly', () => {
    render(<CommitList />)
    expect(screen.getByText('Commit List')).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('Enter GitHub username'),
    ).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Search commits')).toBeInTheDocument()
  })

  it('🔍 renders without crashing', () => {
    render(<CommitList />)
    expect(screen.getByText('Commit List')).toBeInTheDocument()
  })
})
