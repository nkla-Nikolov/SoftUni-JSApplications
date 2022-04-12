import page from '../node_modules/page/page.mjs';
import { createPage } from './create.js';
import { dashboardPage } from './dashboard.js';
import { deletePet } from './delete.js';
import { detailsPage } from './details.js';
import { donate } from './donate.js';
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
page('/dashboard', dashboardPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/delete/:id', deletePet);
page('/donate/:id', donate);

updateNav();
page.start();