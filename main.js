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
            value: React.PropTypes.object.isRequired,
            onChange: React.PropTypes.func.isRequired
        },

        render: function () {
            const oldContact = this.props.value;
            const onChange = this.props.onChange;

            return React.createElement('form', {},
                React.createElement('input', {
                    type: 'text',
                    placeholder: 'Name (required)',
                    value: oldContact.name,
                    onChange: e => onChange(Object.assign({}, oldContact, {name: e.target.value}))
                }),
                React.createElement('input', {
                    type: 'email',
                    placeholder: 'Email',
                    value: oldContact.email,
                    onChange: e => onChange(Object.assign({}, oldContact, {email: e.target.value}))
                }),
                React.createElement('textarea', {
                    placeholder: 'Description',
                    value: oldContact.description,
                    onChange: e => onChange(Object.assign({}, oldContact, {description: e.target.value}))
                }),
                React.createElement('button', {type: 'submit'}, 'Add Contact')
            );
        }
    });

    const ContactView = React.createClass({
        propTypes: {
            contacts: React.PropTypes.array.isRequired,
            newContact: React.PropTypes.object.isRequired,
            onNewContactChange: React.PropTypes.func.isRequired
        },

        render: function () {
            const contactEls = this.props.contacts
                .filter(contact => contact.email)
                .map(contact => React.createElement(ContactItem, contact));

            return React.createElement('div', {className: 'contact-view'},
                React.createElement('h1', {className: 'contact-view-title'}, 'Contacts'),
                React.createElement('ul', {className: 'contact-view-list'}, contactEls),
                React.createElement(ContactForm, {
                    value: this.props.newContact,
                    onChange: this.props.onNewContactChange
                })
            );
        }
    });

    /**
     * Actions
     */

    function updateNewContact(contact) {
        setState({newContact: contact});
    }

    /**
     * Model
     */

    const state = {};

    function setState(changes) {
        Object.assign(state, changes);

        ReactDOM.render(
            React.createElement(ContactView, Object.assign({}, state, {
                onNewContactChange: updateNewContact
            })), document.getElementById('react-app')
        );
    }

    /**
     * Initial data
     */

    // In an Array of children, every item must have a unique 'key' property.
    setState({
        contacts: [
            {key: 1, name: 'Test Testerson', email: 'email@example.com', description: 'A fancy man'},
            {key: 2, name: 'Pat Patternson', email: 'email2@example.com'},
            {key: 3, name: 'Bob Bobberson'}
        ],
        newContact: {name: '', email: '', description: ''}
    });

})(document, window);
