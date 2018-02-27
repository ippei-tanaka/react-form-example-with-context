import React from 'react';
import Form from '@/Form';
import Input from '@/Input';
import ErrorMessage from '@/ErrorMessage';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const {shallow, mount} = Enzyme;

describe('<Form />', () => {
    it('should render children', () => {
        const form = shallow(
            <Form>
                <Input type="text" name="favourite-font" />
                <button>Submit</button>
            </Form>
        );
        expect(form.find('form').length).toBe(1);
        expect(form.find(Input).length).toBe(1);
        expect(form.find('button').length).toBe(1);
    });

    it('should set a value to an element according to its defaultValues prop', () =>
    {
        const form = mount(
            <Form
                defaultValues={{'favourite-color': 'Red'}}>
                <Input type="text" name="favourite-color" />
            </Form>
        );
        expect(form.find('Input[name="favourite-color"] input').prop('value')).toBe('Red');
        expect(form.state().values['favourite-color']).toBe('Red');
    });

    it('should allow users to change the value of an element', () =>
    {
        const form = mount(
            <Form>
                <Input type="text" name="favourite-color" />
            </Form>
        );
        form.find('Input[name="favourite-color"] input').simulate('change', {target: {value: "Red"}});
        expect(form.find('Input[name="favourite-color"] input').prop('value')).toBe('Red');
        expect(form.state().values['favourite-color']).toBe('Red');
    });

    it('should render <ErrorMessage /> if there is an error', () =>
    {
        const validFonts = ['Helvetica', 'Times New Roman', 'Arial'];
        const validColors = ['Red', 'Blue', 'Yellow'];

        const validator = (values) => {
            return {
                'favourite-font': validFonts.includes(values['favourite-font']) ? null : new Error('The font name is not valid.'),
                'favourite-color': validColors.includes(values['favourite-color']) ? null : 'The color name is not valid.'
            }
        };

        const form = mount(
            <Form
                defaultValues={{'favourite-color': 'Red'}}
                validator={validator}>
                <Input type="text" name="favourite-font" />
                <ErrorMessage name="favourite-font" />
                <Input type="text" name="favourite-color" />
                <ErrorMessage name="favourite-color" />
            </Form>
        );

        form.find('form').simulate('submit');
        expect(form.find('Input[name="favourite-color"] input').prop('value')).toBe('Red');
        expect(form.state().values['favourite-color']).toBe('Red');
        expect(form.state().errors).not.toHaveProperty('favourite-color');

        expect(form.find('ErrorMessage[name="favourite-font"] span').exists()).toBe(true);
        expect(form.find('ErrorMessage[name="favourite-font"] span').text()).toBe('The font name is not valid.');
        expect(form.find('ErrorMessage[name="favourite-color"] span').exists()).toBe(false);
    });
});