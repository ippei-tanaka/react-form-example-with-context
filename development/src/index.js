import React from  'react';
import ReactDOM from 'react-dom';
import Form from '@/Form';
import Input from '@/Input';
import ErrorMessage from '@/ErrorMessage';

const validator = (values) => {
    return {
        username: values.username ? null : new Error('The username is not valid.'),
    }
};

ReactDOM.render((
   <div>
       <section>
           <h2>Form #1</h2>
           <Form validator={validator}>
               username: <Input name="username" /><br />
               <ErrorMessage name="username" /><br />
               <button>Submit</button>
           </Form>
       </section>

       <section>
           <h2>Form #2</h2>
           <Form validator={validator}>
               username: <Input name="username" /><br />
               <ErrorMessage name="username" /><br />
               <button>Submit</button>
           </Form>
       </section>

       <section>
           <h2>Form Elements outside of Form</h2>
           username: <Input name="username" /><br />
           <ErrorMessage name="username" /><br />
       </section>
   </div>
), document.querySelector('#App'));

