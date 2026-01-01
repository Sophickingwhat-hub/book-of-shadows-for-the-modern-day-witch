import Home from './pages/Home';
import MyGrimoire from './pages/MyGrimoire';
import Spells from './pages/Spells';
import TheAunty from './pages/TheAunty';
import TableOfContents from './pages/TableOfContents';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "MyGrimoire": MyGrimoire,
    "Spells": Spells,
    "TheAunty": TheAunty,
    "TableOfContents": TableOfContents,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};