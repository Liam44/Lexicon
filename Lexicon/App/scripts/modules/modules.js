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
angular.module('currentuser', ['redirect', 'token']);

// Allows the user to log out
angular.module('logout', ['redirect', 'token', 'ngRoute']);

// Allows the user to log in
angular.module('login', ['currentuser', 'redirect', 'token', 'ngRoute']);

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

// Manages all actions allowed on files
angular.module('documents', ['token', 'ngFileUpload']);

// Manages all actions allowed on courses
angular.module('courses', ['templates', 'token']);

// Manages all actions allowed on course days
angular.module('coursedays', ['documents', 'redirect', 'token']);

// Manages all actions allowed on course parts
angular.module('courseparts', ['token', 'documents', 'links', 'assignments']);

// Manages all actions allowed on links
angular.module('links', ['token', 'redirect']);

// Manages all actions allowed on course parts
angular.module('assignments', ['token', 'documents', 'links']);

// Manages all actions allowed to the admin role
angular.module('admin', ['bsActiveLink',
    'coursedays',
    'courseparts',
    'courses',
    'currentuser',
    'links',
    'messages',
    'news',
    'password',
    'redirect',
    'roles',
    'templates',
    'token',
    'users',
    'ngRoute']);

// Manages all actions allowed to the student role
angular.module('student', ['bsActiveLink',
    'courseparts',
    'courses',
    'currentuser',
    'links',
    'messages',
    'news',
    'password',
    'redirect',
    'token',
    'ngRoute']);

// Manages all actions allowed to the teacher role
angular.module('teacher', ['bsActiveLink',
    'coursedays',
    'courseparts',
    'courses',
    'currentuser',
    'links',
    'messages',
    'news',
    'password',
    'redirect',
    'roles',
    'templates',
    'token',
    'users',
    'ngRoute']);
