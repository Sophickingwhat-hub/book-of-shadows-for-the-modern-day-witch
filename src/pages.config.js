import Home from './pages/Home';
import MyGrimoire from './pages/MyGrimoire';
import Spells from './pages/Spells';
import TheAunty from './pages/TheAunty';
import TableOfContents from './pages/TableOfContents';
import Herbs from './pages/Herbs';
import Crystals from './pages/Crystals';
import JournalEntries from './pages/JournalEntries';
import Tools from './pages/Tools';
import Incense from './pages/Incense';
import Deities from './pages/Deities';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "MyGrimoire": MyGrimoire,
    "Spells": Spells,
    "TheAunty": TheAunty,
    "TableOfContents": TableOfContents,
    "Herbs": Herbs,
    "Crystals": Crystals,
    "JournalEntries": JournalEntries,
    "Tools": Tools,
    "Incense": Incense,
    "Deities": Deities,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};