import '@testing-library/jest-dom'
import 'whatwg-fetch'

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    // Mock: List Repositories
    if (url.includes('/users/test-user/repos')) {
      return Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              id: 1,
              name: 'repo-1',
              language: 'JavaScript',
              stargazers_count: 10,
            },
            {
              id: 2,
              name: 'repo-2',
              language: 'TypeScript',
              stargazers_count: 20,
            },
          ]),
      })
    }

    // Mock: Commit Activity
    if (url.includes('/repos/test-user/repo-1/stats/commit_activity')) {
      return Promise.resolve({
        json: () =>
          Promise.resolve([
            { week: 1630454400, total: 5 },
            { week: 1631059200, total: 10 },
          ]),
      })
    }

    // Mock: Programming Languages
    if (url.includes('/repos/test-user/repo-1/languages')) {
      return Promise.resolve({
        json: () =>
          Promise.resolve({ JavaScript: 12345, HTML: 2345, CSS: 3456 }),
      })
    }

    // Mock: User Information
    if (url.includes('/users/test-user')) {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            login: 'test-user',
            id: 123,
            public_repos: 2,
            followers: 50,
            following: 10,
            avatar_url: 'https://example.com/avatar.png',
          }),
      })
    }

    // Default Mock for Unhandled Requests
    return Promise.resolve({
      json: () => Promise.resolve({}),
    })
  }) as jest.Mock
})

afterEach(() => {
  jest.clearAllMocks()
})
