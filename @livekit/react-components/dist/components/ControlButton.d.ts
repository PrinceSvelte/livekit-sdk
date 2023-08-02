/// <reference types="react" />
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
export interface MenuItem {
    label: string;
}
interface ButtonProps {
    label: string;
    disabled?: boolean;
    onClick?: () => void;
    icon?: IconDefinition;
    className?: string;
    popoverContainerClassName?: string;
    popoverTriggerBtnClassName?: string;
    popoverTriggerBtnSeparatorClassName?: string;
    menuItems?: MenuItem[];
    onMenuItemClick?: (item: MenuItem) => void;
}
export declare const ControlButton: ({ label, disabled, onClick, icon, className, menuItems, popoverContainerClassName, popoverTriggerBtnClassName, popoverTriggerBtnSeparatorClassName, onMenuItemClick, }: ButtonProps) => JSX.Element;
export {};
