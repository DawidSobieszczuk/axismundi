export interface Menu {
    id: number;
    name: string;
}

export interface MenuItem {
    id: number;
    menu_id: number;
    name: string;
    href: string;
}
