import type { ComputedRef } from 'vue';
import type { TransferCheckedState, TransferProps } from './transfer';
export declare const useMove: (props: TransferProps, checkedState: TransferCheckedState, propsKey: ComputedRef<string>, emit: any) => {
    addToLeft: () => void;
    addToRight: () => void;
};
