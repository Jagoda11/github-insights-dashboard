import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

jest.mock('./components/Auth', () => () => <div>Auth Component</div>)
jest.mock('./components/Dashboard', () => () => <div>Dashboard Component</div>)
jest.mock('./components/CommitList', () => () => (
  <div>Commit List Component</div>
))

test('renders the Auth component', () => {
  render(<App />)
  const authComponent = screen.getByText('Auth Component')
  expect(authComponent).not.toBeNull()
})
