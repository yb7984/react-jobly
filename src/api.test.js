import { localStorageMock, testToken } from './_testCommon';
import JoblyApi from './api';
import axios from 'axios';

window.localStorage = localStorageMock;
jest.mock('axios');

beforeEach(()=>{
    // JoblyApi.token = null;
});

afterEach(()=>{
    JoblyApi.token = null;
});

describe("token", function () {
    it('works get token and getCurrentUser', async () => {

        expect(localStorage.getItem("_token")).toEqual(null);
        expect(JoblyApi.token).toEqual(null);

        let user = await JoblyApi.getCurrentUser();
        expect(user).toEqual(null);

        JoblyApi.token = testToken;

        expect(JoblyApi.token).toEqual(testToken);
        expect(localStorage.getItem("_token")).toEqual(testToken);


        const data = {
            status: 200,
            data: {
                user: {
                    username: "testuser"
                }
            },
        };

        axios.mockImplementationOnce(() => Promise.resolve(data));

        user = await JoblyApi.getCurrentUser();
        expect(user).not.toEqual(null);
        expect(user.username).toEqual("testuser");
    });
});
