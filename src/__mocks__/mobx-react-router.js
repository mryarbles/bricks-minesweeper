//jest.genMockFromModule('mobx-react-router');
module.exports = {
  RouterStore: function() {
    return {
      history: {
        replace: jest.fn(),
        push: jest.fn()
      },
      location: {
        pathname: '/'
      }
    };
  }
};
