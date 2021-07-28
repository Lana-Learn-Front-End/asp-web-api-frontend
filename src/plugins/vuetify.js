import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import './composition';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'md',
  },
  theme: { dark: true },
});
