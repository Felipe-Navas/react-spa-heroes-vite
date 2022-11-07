import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../src/auth'
import { Navbar } from '../../../src/ui/components/Navbar'

const mockedUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}))

describe('Testing the Navbar component', () => {
  const contextValue = {
    logged: true,
    user: {
      name: 'UserName',
      id: '123',
    },
    logout: jest.fn(),
  }

  beforeEach(() => jest.clearAllMocks())

  test('should show the user name logged', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    expect(screen.getByText(contextValue.user.name)).toBeTruthy()
  })
  test('should call the logout and navigate', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    const logoutButton = screen.getByRole('button')
    fireEvent.click(logoutButton)

    expect(contextValue.logout).toHaveBeenCalled()
    expect(mockedUseNavigate).toHaveBeenLastCalledWith('/login', {
      replace: true,
    })
  })
})
