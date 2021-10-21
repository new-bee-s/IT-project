const userController = require("../../controllers/userController");
const User = require('../../models/user');

describe('openController', function () {
    const res = {
        json: jest.fn()
    }

    //  properties needed for request to test
    //  openForBusiness
    const req = {
        body: { userID: "4bbj4bSDnk" },
        user: { _id: "61690fd18e86a1372c8ff084" }
    };

    beforeAll(() => {
        // clear the render method (also read about mockReset)
        res.json.mockClear();

        // mock the Mongoose findOne method
        User.findOne = jest.fn().mockResolvedValue([
            {
                email: "admin",
                familyName: "Ge",
                givenName: "asdf",
            }
        ]);

        // call the controller function before testing various properties of
        // it
        userController.SearchUserID(req, res)
        jest.spyOn(console, 'log').mockImplementation(() => { });
    });

    afterAll(() => {
        // Restore mock after all tests are done, so it won't affect other test suites
        console.log.mockRestore();
    });
    afterEach(() => {
        // Clear mock (all calls etc) after each test. 
        console.log.mockClear();
    });

    // Test 1: test the console
    test("Test 1: test console log, expecting to find the user", () => {
        expect(console.log).toBeCalledTimes(1);
        expect(console.log).toHaveBeenLastCalledWith('the user has found')
    });

    // Test 2: testing correct redirect routes 
    /*test("Test 2: testing with existing van, update van status to open, expecting redirect to order page \
      with console", () => {
        // when I run the controller, I expect that the redirect method will
        // be called exactly once        
        expect(res.redirect.mock.calls.length).toEqual(1);

        expect(res.redirect).toHaveBeenCalledWith('/vendor/order');
    });*/




})