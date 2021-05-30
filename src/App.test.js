import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from './App';
import axiosMock from 'axios';
import { localStorageMock, testToken } from './_testCommon';
import JoblyApi from './api';

console.error = jest.fn((msg) => {
  console.log(msg);
});

beforeEach(() => {
});

afterEach(() => {
  JoblyApi.token = "";
});

test('renders page without login', () => {
  JoblyApi.token = "";

  render(<MemoryRouter initialEntries={['/']}><App /></MemoryRouter>);
  render(<MemoryRouter initialEntries={['/login']}><App /></MemoryRouter>);
  render(<MemoryRouter initialEntries={['/signup']}><App /></MemoryRouter>);
});


test('match a snapshot, render with login', async () => {

  JoblyApi.token = testToken;

  const data = {
    status: 200,
    data: {
      user: {
        username: "testuser",
        firstName: "test_f",
        lastName: "test_l",
        isAdmin: true,
        applications: []
      }
    },
  };

  axiosMock.mockResolvedValueOnce(data);
  axiosMock.mockRejectedValue({
    data: {
      error: {
        message: "error"
      }
    }
  })

  const { asFragment, getByTestId, getByText, findByText, findByPlaceholderText } = render(<MemoryRouter initialEntries={['/']}><App /></MemoryRouter>);

  expect(asFragment()).toMatchSnapshot();

  expect(getByTestId("loading")).toBeInTheDocument();

  await findByText('All the jobs in one convenient place.');

  expect(getByText('All the jobs in one convenient place.')).toBeInTheDocument();


  axiosMock.mockResolvedValueOnce({
    status: 200,
    data: {
      companies: [
        {
          handle: "test",
          name: "Test Company",
          numEmployees: 200,
          description: "test test"
        }
      ]
    }
  });

  // go to companies route
  fireEvent.click(getByText("Companies"));

  await findByPlaceholderText('Search companies here');

  expect(getByText("Test Company")).toBeInTheDocument();


  axiosMock.mockResolvedValueOnce({
    status: 200,
    data: {
      jobs: [
        {
          id: "test",
          title: "Test Jobs",
          salary: 200000,
          equity: 70,
          companyHandle: "testcom",
          companyName: "Test Company"
        }
      ]
    }
  });

  // go to jobs route
  fireEvent.click(getByText("Jobs"));

  await findByPlaceholderText('Search jobs here');

  expect(getByText("Test Company")).toBeInTheDocument();
});
