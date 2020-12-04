/*import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession
} from 'amazon-cognito-identity-js';*/
import { returnPromiseWithType } from '../testing/utils/jestUtils';

const cognitoUserSessionMockValid = {
  accessToken: {},
  idToken: {},
  isValid: function() {
    return true;
  }
};

const CognitoUserMock = jest.fn(() => {
  console.log('amazon-cognito-identity-js.CognitoUserMock');
  return {
    getSession: (callback) => {
      callback(null, {
        idToken: 'id',
        getIdToken: jest.fn().mockReturnValue({
          getJwtToken: jest.fn().mockReturnValue('w423412341234q234')
        }),
        getAccessToken: jest.fn().mockReturnValue({
          getJwtToken: jest.fn().mockReturnValue('asdas23423rasdasf')
        }),
        getRefreshToken: jest.fn().mockReturnValue({
          getToken: jest.fn().mockReturnValue('a22341234123 asdvasdf')
        }),
        isValid: jest.fn().mockReturnValue(true)
      });
    },
    authenticateUser: (details, callbacks) => {
      console.log('CognitoUserMock.authenticateUser', callbacks);
      callbacks.onSuccess({
        idToken: 'id',
        getIdToken: jest.fn().mockReturnValue({
          getJwtToken: jest.fn().mockReturnValue()
        }),
        getAccessToken: jest.fn().mockReturnValue({
          getJwtToken: jest.fn().mockReturnValue()
        }),
        getRefreshToken: jest.fn().mockReturnValue({
          getToken: jest.fn().mockReturnValue()
        })
      });
    },
    refreshSession: jest.fn()
  };
});

module.exports = {
  CognitoUserPool: jest.fn().mockImplementation(() => {
    return {
      getCurrentUser: jest.fn().mockImplementation(() => {
        console.log(
          'amazon-cognito-identity-js CognitoUserPool.getCurrentUser  '
        );
        return new CognitoUserMock();
      })
    };
  }),
  CognitoUser: CognitoUserMock,
  AuthenticationDetails: function() {
    return {};
  },
  CognitoUserSession: jest.fn().mockImplementation(() => {
    return new (class {
      getIdToken = jest.fn();
      getRefreshToken = jest.fn();
      getAccessToken = jest.fn();
      isValid = jest.fn();
    })();
  })
};
