

import * as React from 'react';

export const PageContext = React.createContext("");

export function PageProvider({ children }) {

    const [page, setPage] = React.useState("");

    return (
        <PageContext.Provider value={{ page, setPage }}>
            {children}
        </PageContext.Provider>
    )

}

// Hook
export function usePage() {
    return React.useContext(PageContext);
}

