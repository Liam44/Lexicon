// This allows to split a same module in different files

// Set the current page as active in the navbar of the index.html page
angular.module('bsActiveLink', []);

// Allows the controllers to redirect to different routes
angular.module('redirect', []);

// Allows the token bearer management
angular.module('token', []);

// Allows password management
angular.module('password', ['token']);

// Allows to get informations about the currently logged in user
angular.module('currentuser', ['token', 'redirect']);

// Allows the user to log out
angular.module('logout', ['token', 'redirect', 'ngRoute']);

// Allows the user to log in
angular.module('login', ['token', 'currentuser', 'redirect']);

// Manages all actions allowed on news
angular.module('news', ['token']);

// Manages all actions allowed on roles
angular.module('roles', []);

// Manages all actions allowed on user accounts
angular.module('users', ['token']);

// Manages all actions allowed on messages
angular.module('messages', ['token']);

// Manages all actions allowed on course templates
angular.module('templates', ['token']);

// Manages all actions allowed on courses
angular.module('courses', ['token', 'coursetemplates']);

// Manages all actions allowed on course days
angular.module('coursedays', ['token']);

// Manages all actions allowed on course parts
angular.module('courseparts', ['token']);

// Manages all actions allowed to the admin role
angular.module('admin', ['bsActiveLink',
    'token',
    'currentuser',
    'redirect',
    'users',
    'roles',
    'password',
    'messages',
    'news',
    'templates',
    'coursedays',
    'ngRoute']);

// Manages all actions allowed to the student role
angular.module('student', ['bsActiveLink',
    'token',
    'currentuser',
    'redirect',
    'password',
    'messages',
    'news',
    'ngRoute']);

// Manages all actions allowed to the teacher role
angular.module('teacher', ['bsActiveLink',
    'token',
    'currentuser',
    'redirect',
    'users',
    'roles',
    'password',
    'messages',
    'news',
    'ngRoute']);
