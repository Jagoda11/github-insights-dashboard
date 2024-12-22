import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
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

  it('🖊️ updates the username input value', () => {
    render(<CommitList />)
    const usernameInput = screen.getByPlaceholderText('Enter GitHub username')
    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    expect(usernameInput).toHaveValue('testuser')
  })

  it('🔍 updates the search input value', () => {
    render(<CommitList />)
    const searchInput = screen.getByPlaceholderText('Search commits')
    fireEvent.change(searchInput, { target: { value: 'fix' } })
    expect(searchInput).toHaveValue('fix')
  })

  it('⚠️ displays an error message if no username is entered', () => {
    render(<CommitList />)
    const usernameInput = screen.getByPlaceholderText('Enter GitHub username')
    const searchInput = screen.getByPlaceholderText('Search commits')

    fireEvent.change(usernameInput, { target: { value: '' } })
    fireEvent.change(searchInput, { target: { value: 'anything' } })

    expect(
      screen.queryByText('Error: Invalid username'),
    ).not.toBeInTheDocument()
  })
})
