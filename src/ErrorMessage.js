import React from 'react';
import PropTypes from 'prop-types';
import {FormConsumer} from "@/Form";

const extractErrorObject = error =>
{
    if (error instanceof Error)
    {
        return error.message;
    } else if (typeof error === 'string') {
        return error;
    } else {
        return false;
    }
};

const ErrorMessage = ({children, name, ...rest}) => (
    <FormConsumer>
        {({errors}) => {
            const errorMessage = extractErrorObject(errors[name]);
            return errorMessage ? <span {...rest}>{errorMessage}</span> : null;
        }}
    </FormConsumer>
);

ErrorMessage.propTypes = {
    name: PropTypes.string.isRequired
};

export default ErrorMessage;
