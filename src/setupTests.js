import 'jest-extended';
import '@babel/polyfill';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, render, mount } from 'enzyme';
import 'jest-localstorage-mock';

// configure enzyme
Enzyme.configure({ adapter: new Adapter() });
jest.disableAutomock();

/*
 * Enzyme
 */
global.shallow = shallow;
global.render = render;
global.mount = mount;
