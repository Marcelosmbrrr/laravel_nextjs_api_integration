

import * as React from 'react';

export const MenuOpenContext = React.createContext(true);

export function MenuOpenProvider({ children }) {

    const [open, setOpen] = React.useState(true);

    return (
        <MenuOpenContext.Provider value={{ open, setOpen }}>
            {children}
        </MenuOpenContext.Provider>
    )

}

export function useMenuOpen() {
    return React.useContext(MenuOpenContext);
}

