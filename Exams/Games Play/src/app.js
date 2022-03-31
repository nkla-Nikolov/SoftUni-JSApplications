import page from '../node_modules/page/page.mjs';
import { catalogPage } from './catalog.js';
import { createPage } from './create.js';
import { deleteGame } from './delete.js';
import { detailsPage } from './details.js';
import { editPage } from './edit.js';
import { homePage } from './home.js';
import { loginPage } from './login.js';
import { logout } from './logout.js';
import { registerPage } from './register.js';
import { updateNav } from './updateNav.js';

page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', logout);
page('/catalog', catalogPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/delete/:id', deleteGame);

updateNav();
page.start();