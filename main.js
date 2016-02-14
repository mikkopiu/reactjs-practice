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
            onChange: React.PropTypes.func.isRequired,
            onSubmit: React.PropTypes.func.isRequired
        },

        onNameChange: function onNameChange(e) {
            this.props.onChange(Object.assign({}, this.props.value, {name: e.target.value}));
        },

        onEmailChange: function onEmailChange(e) {
            this.props.onChange(Object.assign({}, this.props.value, {email: e.target.value}));
        },

        onDescriptionChange: function onDescriptionChange(e) {
            this.props.onChange(Object.assign({}, this.props.value, {description: e.target.value}));
        },

        onSubmit: function onSubmit(e) {
            e.preventDefault();
            this.props.onSubmit();
        },

        render: function () {
            const errors = this.props.value.errors || {};

            return React.createElement('form', {onSubmit: this.onSubmit, noValidate: true},
                React.createElement('input', {
                    type: 'text',
                    placeholder: 'Name (required)',
                    value: this.props.value.name,
                    onChange: this.onNameChange
                }),
                React.createElement('input', {
                    type: 'email',
                    placeholder: 'Email',
                    value: this.props.value.email,
                    onChange: this.onEmailChange
                }),
                React.createElement('textarea', {
                    placeholder: 'Description',
                    value: this.props.value.description,
                    onChange: this.onDescriptionChange
                }),
                React.createElement('button', {type: 'submit'}, 'Add Contact')
            );
        }
    });

    const ContactView = React.createClass({
        propTypes: {
            contacts: React.PropTypes.array.isRequired,
            newContact: React.PropTypes.object.isRequired,
            onNewContactChange: React.PropTypes.func.isRequired,
            onNewContactSubmit: React.PropTypes.func.isRequired
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
                    onChange: this.props.onNewContactChange,
                    onSubmit: this.props.onNewContactSubmit
                })
            );
        }
    });

    /**
     * Constants
     */

    const CONTACT_TEMPLATE = {name: '', email: '', description: '', errors: null};

    /**
     * Actions
     */

    function updateNewContact(contact) {
        setState({newContact: contact});
    }

    function submitNewContact() {
        const contact = Object.assign({}, state.newContact, {key: state.contacts.length + 1, errors: {}});

        if (!contact.name) {
            contacts.errors.name = ['Please enter your new contact\'s name'];
        }
        if (!/.+@.+\..+/.test(contact.email)) {
            contact.errors.email = ['Please enter your new contact\'s email'];
        }

        setState(
            Object.keys(contact.errors).length === 0 ?
            {
                newContact: Object.assign({}, CONTACT_TEMPLATE),
                contacts: state.contacts.slice(0).concat(contact)
            } : {newContact: contact}
        );
    }

    /**
     * Model
     */

    const state = {};

    function setState(changes) {
        Object.assign(state, changes);

        ReactDOM.render(
            React.createElement(ContactView, Object.assign({}, state, {
                onNewContactChange: updateNewContact,
                onNewContactSubmit: submitNewContact
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
        newContact: Object.assign({}, CONTACT_TEMPLATE)
    });

})(document, window);
