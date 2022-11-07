const { render, screen } = require('@testing-library/react')
const { MemoryRouter } = require('react-router-dom')
const { SearchPage } = require('../../../src/heroes/pages/SearchPage')

describe('Testing the SearchPage', () => {
  test('should render correctly', () => {
    const {container} = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    )
    expect(container).toMatchSnapshot()
  })
})
