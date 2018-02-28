import React, {Component} from 'react';
import PropTypes from 'prop-types';
import createContext from 'create-react-context';
import pickBy from 'lodash/pickBy';

const ValuesContext = createContext({});
const ErrorsContext = createContext({});
const SetValueContext = createContext(() => {});

export const FormConsumer = ({children}) => {
    return (
        <ErrorsContext.Consumer>
            {errors => (
                <ValuesContext.Consumer>
                    {values => (
                        <SetValueContext.Consumer>
                            {setValue => children({errors, values, setValue})}
                        </SetValueContext.Consumer>
                    )}
                </ValuesContext.Consumer>
            )}
        </ErrorsContext.Consumer>
    );
};

const INITIAL_ERRORS_STATE = {};

class Form extends Component {

    constructor (props)
    {
        super(props);
        this.state = {
            values: props.defaultValues,
            errors: INITIAL_ERRORS_STATE
        };
    }

    render ()
    {
        const {
            validator, // removing validator prop from 'rest'
            onSubmit, // removing onSubmit prop from 'rest'
            defaultValues, //  removing defaultValues prop from 'rest'
            children,
            ...rest
        } = this.props;

        return (
            <ValuesContext.Provider value={this.state.values}>
                <ErrorsContext.Provider value={this.state.errors}>
                    <SetValueContext.Provider value={this._setValue.bind(this)}>
                        <form onSubmit={this._onSubmit.bind(this)} {...rest}>
                            {children}
                        </form>
                    </SetValueContext.Provider>
                </ErrorsContext.Provider>
            </ValuesContext.Provider>
        )
    }

    _setValue (name, value)
    {
        this.setState(state => {
            state.values = {
                ...state.values,
                [name]: value
            };
            return state;
        });
    }

    _onSubmit (event)
    {
        event.preventDefault();
        const values = this.state.values;
        const errors = this._validate();
        this.setState({errors});
        this.props.onSubmit({errors, values}, event);
    }

    _validate ()
    {
        let errors = this.props.validator(this.state.values);
        errors = pickBy(errors, d => !!d);
        return Object.keys(errors).length > 0 ? errors : INITIAL_ERRORS_STATE;
    }
}

Form.propTypes = {
    validator: PropTypes.func,
    onSubmit: PropTypes.func,
    defaultValues: PropTypes.object
};

Form.defaultProps = {
    validator: () => INITIAL_ERRORS_STATE,
    onSubmit: () => {},
    defaultValues: {}
};

export default Form;