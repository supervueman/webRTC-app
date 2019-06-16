import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import {
	authenticate
} from '@/store/authenticate';
import {
	streamers
} from '@/store/streamers'

export const store = new Vuex.Store({
	modules: {
		authenticate,
		streamers
	}
});
