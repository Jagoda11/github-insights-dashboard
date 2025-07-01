import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Auth from './Auth'
if (!Auth) throw new Error('Auth component import failed')

describe('Auth Component 🎉', () => {
  let originalLocation: Location

  beforeEach(() => {
    originalLocation = window.location
    delete (window as any).location

    Object.defineProperty(window, 'location', {
      value: {
        ...originalLocation,
        reload: jest.fn(),
        assign: jest.fn(),
        replace: jest.fn(),
        toString: () => originalLocation.toString(),
        hostname: 'localhost', // for image path logic
      },
      writable: true,
    })

    localStorage.clear()
  })

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true,
    })
  })

  it('✅ should be defined ✨', () => {
    expect(Auth).toBeDefined()
  })

  it('🎨 renders the authentication form 📝', () => {
    render(<Auth />)

    expect(screen.getByText('GitHub Authentication')).toBeInTheDocument()
    expect(
      screen.getByText(
        'To use this dashboard, you need to provide a GitHub Personal Access Token.',
      ),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('GitHub Username:')).toBeInTheDocument()
    expect(
      screen.getByLabelText('GitHub Personal Access Token:'),
    ).toBeInTheDocument()
  })

  it('🎯 updates input fields on user input 🖊️', () => {
    render(<Auth />)

    const usernameInput = screen.getByLabelText('GitHub Username:')
    const tokenInput = screen.getByLabelText('GitHub Personal Access Token:')

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(tokenInput, { target: { value: 'testtoken' } })

    expect(usernameInput).toHaveValue('testuser')
    expect(tokenInput).toHaveValue('testtoken')
  })

  it('💾 saves inputs to localStorage and reloads on form submission 🔄', () => {
    render(<Auth />)

    const usernameInput = screen.getByLabelText('GitHub Username:')
    const tokenInput = screen.getByLabelText('GitHub Personal Access Token:')
    const submitButton = screen.getByRole('button', { name: 'Submit' })

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(tokenInput, { target: { value: 'testtoken' } })
    fireEvent.click(submitButton)

    expect(localStorage.getItem('githubUsername')).toBe('testuser')
    expect(localStorage.getItem('githubToken')).toBe('testtoken')
    expect(window.location.reload).toHaveBeenCalled()
  })

  it('🔗 contains a link to generate a GitHub token 🔑', () => {
    render(<Auth />)

    const link = screen.getByRole('link', {
      name: 'Click here to generate a New GitHub Personal Access Token',
    })

    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://github.com/settings/tokens')
  })
})
