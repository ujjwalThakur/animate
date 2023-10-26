import React from "react";
import './Page.css'

const Page = ({id, page, prevPage, children}) => {
    
        return <div className={`page page${id+1}`}>
                {children}
            </div>
}

export default Page;