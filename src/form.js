import React, {Component} from 'react';

//export const FormContext =

export default class Form extends Component {

    render ()
    {
        const {...attributes} = this.props;
        return (
            <form {...attributes} />
        )
    }

}