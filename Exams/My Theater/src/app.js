import page from '../node_modules/page/page.mjs';
import { createPage } from './create.js';
import { deleteEvent } from './delete.js';
import { detailsPage } from './details.js';
import { editPage } from './edit.js';
import { homePage } from './home.js';
import { likeEvent } from './like.js';
import { loginPage } from './login.js';
import { logout } from './logout.js';
import { profilePage } from './profile.js';
import { registerPage } from './register.js';
import { updateNav } from './updateNav.js';

page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', logout);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/delete/:id', deleteEvent);
page('/profile', profilePage);
page('/like/:id', likeEvent);

updateNav();
page.start();