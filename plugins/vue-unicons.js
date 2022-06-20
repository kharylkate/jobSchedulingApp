import Vue from "vue";
import Unicon from "vue-unicons/dist/vue-unicons-vue2.umd";
import { uniLayerGroupMonochrome, 
    uniCarWash,
    uniCheck,
    uniMultiply,
    uniExclamation,
    uniInfo,
    uniPlus,
    uniPen,
    uniTrash,
    uniDirection,
    uniArrow,
    uniLockAccess,
    uniClock,
    uniUser,
    uniCheckCircle
} from "vue-unicons/dist/icons";

Unicon.add([
    uniLayerGroupMonochrome, 
    uniCarWash,
    uniCheck,
    uniMultiply,
    uniExclamation,
    uniInfo,
    uniPlus,
    uniPen,
    uniTrash,
    uniDirection,
    uniArrow,
    uniLockAccess,
    uniClock,
    uniUser,
    uniCheckCircle
]);
Vue.use(Unicon, {
    height: 20,
    width: 20
});