const { render, screen, fireEvent } = require('@testing-library/react')
const { MemoryRouter } = require('react-router-dom')
const { SearchPage } = require('../../../src/heroes/pages/SearchPage')

const mockedUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}))

describe('Testing the SearchPage', () => {
  beforeEach(() => jest.clearAllMocks())

  test('should render correctly', () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    )
    expect(container).toMatchSnapshot()
  })

  test('should show Batman and on the input field', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchPage />
      </MemoryRouter>
    )
    const input = screen.getByRole('textbox')
    const img = screen.getByRole('img')
    const alertDanger = screen.getByLabelText('alert-danger')

    expect(input.value).toBe('batman')
    expect(img.src).toContain('/assets/heroes/dc-batman.jpg')
    expect(alertDanger.style.display).toBe('none')
  })

  test('should show and error if I dont found the hero', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman123']}>
        <SearchPage />
      </MemoryRouter>
    )
    const alertDanger = screen.getByLabelText('alert-danger')

    expect(alertDanger.style.display).toBe('')
  })

  test('should call the navigate to the new screen', () => {
    const inputValue = 'superman'

    render(
      <MemoryRouter initialEntries={['/search']}>
        <SearchPage />
      </MemoryRouter>
    )

    const input = screen.getByRole('textbox')

    fireEvent.change(input, {
      target: { name: 'searchText', value: inputValue },
    })

    const form = screen.getByRole('form')

    fireEvent.submit(form)

    expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${inputValue}`)
  })
})
