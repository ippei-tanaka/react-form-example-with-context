import React from 'react';
import Form from '@/form';
import Input from '@/input';
import Button from '@/button';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const shallow = Enzyme.shallow;

describe('<Form />', () => {
    it('renders children', () => {
        const wrapper = shallow(
            <Form>
                <Input type="text" name="favourite-font" />
                <Button>Submit</Button>
            </Form>
        );
        expect(wrapper.find('form').length).toBe(1);
        expect(wrapper.find(Input).length).toBe(1);
        expect(wrapper.find(Button).length).toBe(1);
    });
});