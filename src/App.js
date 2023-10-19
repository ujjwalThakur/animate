import { useState } from 'react';
import './App.css';
import Page from './components/Page';
import Likendin from './components/Linkedin.svg' 
import Gmail from './components/Gmail.svg' 


function App() {
  const [prevPage, setPrevPage] = useState(-1)
  const [page, setPage] = useState(0)

  const [lastPageChangedAt, setLastPageChangedAt] = useState(Date.now())

  const onWheelHandler = (e)=>{
    if(Date.now()-lastPageChangedAt < 600) return

    if((e.deltaY < -5) & (page>0)){
      setPrevPage(page)
      setPage((prevPage)=>prevPage-1)
      setLastPageChangedAt(Date.now())
    }
    if((e.deltaY > 5) & (page<2)){
      setPrevPage(page)
      setPage((prevPage)=>prevPage+1)
      setLastPageChangedAt(Date.now())
    }
  }

  const onClickHandler = (button)=>{
    return ()=>{
      if(!(page===button)){
        setPrevPage(page)
        setPage(button)
      }
    }
  }

  return (
    <div className="App" onWheel={onWheelHandler}>
        <Page id={0} page={page} prevPage={prevPage}>
          <div>
            <div className='hello'>HELLO</div>
            <div>I am Ujjwal,</div>
            <div>a Business analyst working at Citymall.</div>
          </div>
        </Page>
        <Page id={1} page={page} prevPage={prevPage}>
        <div id='projects_page'>
              <div>Coming up</div>
          </div>
        </Page>
        <Page id={2} page={page} prevPage={prevPage}>
          <div id='contact_page'>
              <div>Get in touch </div>
              <div className='contact'>
                <img src={Likendin} alt="Linkedin" width='50px' height='50px'/>
                <p>https://www.linkedin.com/in/ujjwal-kumar-ba48941a1/</p>
              </div>
              <div className='contact'>
                <img src={Gmail} alt="Gmail" width='50px' height='50px'/>
                <p>ukthakur00@gmail.com</p>
              </div>
          </div>
        </Page>
      <div className='button_container'>
        <button onClick={onClickHandler(0)} className={`${page==0?'active':''}`}>Home</button>
        <button onClick={onClickHandler(1)} className={`${page==1?'active':''}`}>Work</button>
        <button onClick={onClickHandler(2)} className={`${page==2?'active':''}`}>Contact</button>
      </div>
    </div>
  )
}

export default App;
