/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import { greet } from './index'
describe('👋 greet function', () => {
  it('👋 should print a greeting message', () => {
    const consoleSpy = jest.spyOn(console, 'log')
    const name = 'User'
    greet(name)
    expect(consoleSpy).toHaveBeenCalledWith(
      `Hello, ${name}! 👋 Welcome to my project.`,
    )
    consoleSpy.mockRestore()
  })
})
