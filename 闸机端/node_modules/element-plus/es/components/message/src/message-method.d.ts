import type { VNode } from 'vue';
import type { Message } from './message';
export declare function close(id: string, userOnClose?: (vm: VNode) => void): void;
export declare function closeAll(): void;
declare const _default: Message;
export default _default;
