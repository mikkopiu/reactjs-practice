;(function (document, window, undefined) {
    'use strict';

    /**
     * Components
     */

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

    const ContactView = React.createClass({
        propTypes: {
            contacts: React.PropTypes.array.isRequired,
            newContact: React.PropTypes.object.isRequired
        },

        render: function () {
            const contactEls = contacts
                .filter(contact => contact.email)
                .map(contact => React.createElement(ContactItem, contact));

            return React.createElement('div', {className: 'contact-view'},
                React.createElement('h1', {className: 'contact-view-title'}, 'Contacts'),
                React.createElement('ul', {className: 'contact-view-list'}, contactEls),
                React.createElement(ContactForm, {contact: newContact})
            );
        }
    });

    /**
     * Data
     */

    // In an Array of children, every item must have a unique 'key' property.
    const contacts = [
        {key: 1, name: 'Test Testerson', email: 'email@example.com', description: 'A fancy man'},
        {key: 2, name: 'Pat Patternson', email: 'email2@example.com'},
        {key: 3, name: 'Bob Bobberson'}
    ];

    const newContact = {name: '', email: '', description: ''};

    ReactDOM.render(React.createElement(ContactView, {contacts, newContact}), document.getElementById('react-app'));
})(document, window);
