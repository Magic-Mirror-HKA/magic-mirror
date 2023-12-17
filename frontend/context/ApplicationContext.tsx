import { ReactNode } from "react";

export type SelectablePageItem = {
    label: ReactNode;
    icon: any;
    onClick: () => void;
};
