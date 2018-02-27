import React from 'react';
import PropTypes from "prop-types";
import {FormConsumer} from "@/Form";

const Input = ({children, name, value, defaultValue, ...rest}) => (
    <FormConsumer>
        {({values, setValue}) => {
            return (
                <input name={name}
                       value={values[name] || ""}
                       onChange={(event) =>  {
                           event.preventDefault();
                           setValue(name, event.target.value);
                       }}
                       {...rest} />
            );
        }}
    </FormConsumer>
);

Input.propTypes = {
    name: PropTypes.string.isRequired
};

export default Input;