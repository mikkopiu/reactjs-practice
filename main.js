;(function (document, window, undefined) {
    'use strict';

    // In an Array of children, every item must have a unique 'key' property.
    const contacts = [
        {key: 1, name: 'Test Testerson', email: 'email@example.com', description: 'A fancy man'},
        {key: 2, name: 'Pat Patternson', email: 'email2@example.com'},
        {key: 3, name: 'Bob Bobberson'}
    ];

    const newContact = {name: '', email: '', description: ''};

    const ContactItem = React.createClass({
        propTypes: {
            name: React.PropTypes.string.isRequired,
            email: React.PropTypes.string.isRequired,
            description: React.PropTypes.string
        },

        render: function () {
            return React.createElement('li', {className: 'Contact'},
                React.createElement('h2', {className: 'Contact-name'}, this.props.name),
                React.createElement('a', {href: `mailto:${this.props.email}`}, this.props.email),
                React.createElement('div', {}, this.props.description)
            );
        }
    });

    const ContactForm = React.createClass({
        propTypes: {
            contact: React.PropTypes.object.isRequired
        },

        render: function () {
            return React.createElement('form', {},
                React.createElement('input', {
                    type: 'text',
                    placeholder: 'Name (required)',
                    value: this.props.contact.name
                }),
                React.createElement('input', {
                    type: 'email',
                    placeholder: 'Email',
                    value: this.props.contact.email
                }),
                React.createElement('textarea', {
                    placeholder: 'Description',
                    value: this.props.contact.description
                }),
                React.createElement('button', {type: 'submit'}, 'Add Contact')
            );
        }
    });

    const contactEls = contacts
        .filter(contact => contact.email)
        .map(contact => React.createElement(ContactItem, contact));

    const rootEl = React.createElement('div', {},
        React.createElement('h1', {}, 'Contacts'),
        React.createElement('ul', {}, contactEls),
        React.createElement(ContactForm, {contact: newContact})
    );

    ReactDOM.render(rootEl, document.getElementById('react-app'));
})(document, window);
