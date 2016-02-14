;(function (document, window, undefined) {
    'use strict';

    const rootEl = React.createElement('div', {},
        React.createElement('h1', {}, 'Contacts'),
        React.createElement('ul', {},
            React.createElement('li', {},
                React.createElement('h2', {}, 'Test Testerson'),
                React.createElement('a', {href: 'mailto:email@example.com'}, 'email@examle.com')
            ),
            React.createElement('li', {},
                React.createElement('h2', {}, 'Pat Patternson'),
                React.createElement('a', {href: 'mailto:email2@example.com'}, 'email2@example.com')
            )
        )
    );

    ReactDOM.render(rootEl, document.getElementById('react-app'));
})(document, window);
