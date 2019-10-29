import Vue from 'vue'
import {
    Button,
    Cell,
    Navbar,
    Tabbar,
    TabItem,
    Toast,
    MessageBox,
    Popup,
    Field,
    Loadmore
} from 'mint-ui'
Vue.component(Button.name, Button)
Vue.component(Cell.name, Cell)
Vue.component(Navbar.name, Navbar);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Toast.name, Toast);
Vue.component(MessageBox.name, MessageBox);
Vue.component(Popup.name, Popup);
Vue.component(Field.name, Field);
Vue.component(Loadmore.name, Loadmore);
window.Toast = Toast
window.MessageBox = MessageBox

