import { createApp } from 'vue';
import App from './App.vue';
// import BtsVue from 'bts-vue';

// 导入router
import router from './router';
// 导入bootstrap css
import 'bts-vue/es/styles/bootstrap-other.scss';
// 导入bts-vue message组件样式
import 'bts-vue/es/components/bs-message/style';
// 导入代码高亮插件css
import 'prism-themes/themes/prism-atom-dark.css';
// import '../../src/styles/index';
// import '../../src/styles/bootstrap-other.scss';
// import BsVue from '../../src/components/index';
import { setupI18n, getStorageLangCode } from './i18n/i18nUtil';
import { langCode } from './store/lang';
// 导入全局组件
import DemoBox from './components/DemoBox.vue';
import ComponentDoc from './components/ComponentDoc.vue';
import BsVueDoc from './components/BsVueDoc.vue';

const app = createApp(App);
let defaultLangCode = getStorageLangCode() || 'cn';
const i18n = setupI18n({
  locale: defaultLangCode,
  legacy: false
});
langCode.value = defaultLangCode;
app.use(i18n);
// app.use(BtsVue);

// initBootstrapComponents(app);
app.component(DemoBox.name, DemoBox);
app.component(ComponentDoc.name, ComponentDoc);
app.component(BsVueDoc.name, BsVueDoc);
app.use(router);

app.mount('#app');
