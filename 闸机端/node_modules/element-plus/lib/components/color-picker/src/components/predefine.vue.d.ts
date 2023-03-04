import Color from '../color';
import type { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    colors: {
        type: ArrayConstructor;
        required: true;
    };
    color: {
        type: PropType<Color>;
        required: true;
    };
}, {
    rgbaColors: any;
    handleSelect: (index: any) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    colors: {
        type: ArrayConstructor;
        required: true;
    };
    color: {
        type: PropType<Color>;
        required: true;
    };
}>>, {}>;
export default _default;
