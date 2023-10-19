import React from "react";
import './Page.css'
import { CSSTransition } from "react-transition-group";

const Page = ({id, page, prevPage, children}) => {
    
        let classNames = 'page'

        if(id==prevPage)
            classNames = prevPage<page ? 'page-left' : 'page-right'
        if(id==page)
            classNames = prevPage<page ? 'page-right' : 'page-left'

        return <CSSTransition
                in={page==id} 
                appear={true}
                timeout={700}
                classNames={classNames}
                unmountOnExit={true}
            >
            <div className={`page page${id+1}`}>
                {children}
            </div>
        </CSSTransition>

}


export default Page;