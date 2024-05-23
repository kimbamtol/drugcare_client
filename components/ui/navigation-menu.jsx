import React from 'react';

export function NavigationMenuLink({ href, children }) {
    return <a href={href} className="navigation-menu-link">{children}</a>;
}

export function NavigationMenuItem({ children }) {
    return <li className="navigation-menu-item">{children}</li>;
}

export function NavigationMenuList({ children }) {
    return <ul className="navigation-menu-list">{children}</ul>;
}

export function NavigationMenu({ children }) {
    return <nav className="navigation-menu">{children}</nav>;
}
