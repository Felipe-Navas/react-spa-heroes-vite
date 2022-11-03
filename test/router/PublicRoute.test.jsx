import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AuthContext } from '../../src/auth'
import { PublicRoute } from '../../src/router/PublicRoute'

describe('Testing PublicRoute', () => {
  test('should show the children if not autenticated', () => {
    const contextValue = {
      logged: false,
    }
    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRoute>
          <h1>Public Route - Please login</h1>
        </PublicRoute>
      </AuthContext.Provider>
    )

    expect(screen.getByText('Public Route - Please login')).toBeTruthy()
  })

  test('should navigate to marvel if autenticated', () => {
    const contextValue = {
      logged: true,
      user: {
        name: 'test',
        id: '123',
      },
    }
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route
              path="login"
              element={
                <PublicRoute>
                  <h1>Public Route - Please login</h1>
                </PublicRoute>
              }
            />
            <Route path="marvel" element={<h1>Marvel Page</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    )
    expect(screen.getByText('Marvel Page')).toBeTruthy()
  })
})
