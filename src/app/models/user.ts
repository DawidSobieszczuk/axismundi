export interface User {
    id: number;
    name: string;
    email: string;
}

export enum UserPermision {
    CreateArticles = 'create articles',
    EditArticles = 'edit articles',
    DeleteArticles = 'delete articles',
    PublishArticles = 'publish articles',
    UnpublishArticles = 'unpublish articles',

    CreateOptions = 'create options',
    EditOptions = 'edit options',
    DeleteOptions = 'delete options',

    CreateSocials = 'create socials',
    EditSocials = 'edit socials',
    DeleteSocials = 'delete socials',

    CreateMenus = 'create menus',
    EditMenus = 'edit menus',
    DeleteMenus = 'delete menus',

    UploadFiles = 'upload files',
    DeleteFiles = 'delete files',
}