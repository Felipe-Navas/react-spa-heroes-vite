import { authReducer } from '../../../src/auth/context/authReducer'
import { types } from '../../../src/auth/types/types'

describe('Testing the authReducer', () => {
  test('should return the default state', () => {
    const state = authReducer({ logged: false }, {})

    expect(state).toEqual({ logged: false })
  })

  test('should login correctly', () => {
    const action = {
      type: types.login,
      payload: {
        name: 'Test',
        id: '123',
      },
    }

    const state = authReducer({ logged: false }, action)

    expect(state).toEqual({
      logged: true,
      user: action.payload,
    })
  })

  test('should logout correctly', () => {
    const state = {
      logged: true,
      user: {
        name: 'Test',
        id: '123',
      },
    }

    const action = {
      type: types.logout,
    }

    const newState = authReducer(state, action)

    expect(newState).toEqual({ logged: false })
  })
})
