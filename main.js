;(function (document, window, undefined) {
    'use strict';

    /**
     * Manual version:
     */
    // const rootEl = React.createElement('div', {},
    //     React.createElement('h1', {}, 'Contacts'),
    //     React.createElement('ul', {},
    //         React.createElement('li', {},
    //             React.createElement('h2', {}, 'Test Testerson'),
    //             React.createElement('a', {href: 'mailto:email@example.com'}, 'email@examle.com')
    //         ),
    //         React.createElement('li', {},
    //             React.createElement('h2', {}, 'Pat Patternson'),
    //             React.createElement('a', {href: 'mailto:email2@example.com'}, 'email2@example.com')
    //         )
    //     )
    // );

    /**
     * First version with some logic
     */

    // In an Array of children, every item must have a unique 'key' property.
    const contacts = [
        {key: 1, name: 'Test Testerson', email: 'email@example.com'},
        {key: 2, name: 'Pat Patternson', email: 'email2@example.com'},
        {key: 3, name: 'Bob Bobberson'}
    ];

    const listEls = contacts
        .filter(contact => contact.email)
        .map(contact => {
            return React.createElement('li', {key: contact.key},
                React.createElement('h2', {}, contact.name),
                React.createElement('a', {href: `mailto:${contact.email}`}, contact.email)
            );
        });

    const rootEl = React.createElement('div', {},
        React.createElement('h1', {}, 'Contacts'),
        React.createElement('ul', {}, listEls)
    );

    ReactDOM.render(rootEl, document.getElementById('react-app'));
})(document, window);
