import { useEffect, useRef, useState } from 'react';
import './App.css';
import Page from './components/Page';
import {ReactComponent as Likendin} from './components/Linkedin.svg' 
import {ReactComponent as Email} from './components/Email.svg' 
import {ReactComponent as Observable} from './components/Observable.svg' 
import NameCursive from './components/NameCursive.svg'

import { Vector, Particle } from './components/utility';
import sendMessage from './firebase';

function App() {
  const [prevPage, setPrevPage] = useState(-1)
  const [page, setPage] = useState(0)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)
  
  window.onresize = ()=>{
    setWindowWidth(window.innerWidth)
    setWindowHeight(window.innerHeight)
  }

  useEffect(()=>{
    if(windowWidth<100) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const mouse = {x: 10000, y:10000}

    window.addEventListener('mousemove', (e)=>{
      mouse.x = e.clientX
      mouse.y = e.clientY
    })

    if(windowWidth >= 800){
      ctx.font = "bolder 210px monospace";
      ctx.fillText("HELLO", 60, 210); 
    }
    else if (windowWidth >= 500) {
      ctx.font = "bolder 150px monospace";
      ctx.fillText("HELLO", 40, 210); 
    }
    else {
      ctx.font = "bolder 80px monospace";
      ctx.fillText("HELLO", 20, 180); 
    }

    let dpx = windowWidth >= 500 ? 5 : 3

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const data = imageData.data;

    const particles = []
    for (let i = 0; i < canvas.height; i+=dpx) {
        for (let j = 0; j < canvas.width; j+=dpx) {
            if(data[(i*canvas.width + j)*4+3] < 240) continue
            particles.push(new Particle(j, i, j+(100*Math.random()-50), i+(100*Math.random()-50)))  
        }
    }

    function run() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particles.length; i++) {

          particles[i].acc = (new Vector(particles[i].fx, particles[i].fy)).sub(particles[i].position).scale(0.05)
          let disFromMouse = particles[i].position.sub(new Vector(mouse.x, mouse.y))
          if(disFromMouse.mag()<100){
            particles[i].acc = particles[i].acc.add((disFromMouse).scale(2/disFromMouse.mag()))
          }else{
            particles[i].acc = particles[i].acc.add((disFromMouse).scale(2*100/disFromMouse.mag()/disFromMouse.mag()))
          }
          particles[i].move()
          particles[i].accelerate()
          particles[i].velocity = particles[i].velocity.scale(0.9);
          
          ctx.beginPath();
          ctx.arc(particles[i].position.x, particles[i].position.y, (dpx>=4?2:1.5), 0, 2 * Math.PI, false);
          ctx.fill()
      }
    }
    let intervalId = setInterval(run, 60)

    return ()=>{clearInterval(intervalId)}
  }, [windowWidth, windowHeight])

  const canvasRef = useRef()

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

  const onScrollHandler = (e)=>{
    if(e.target.scrollHeight>e.target.clientHeight){
      e.stopPropagation()
      // if(((e.target.scrollTop>0) & (e.target.deltaY<0)) || 
      //    ((e.target.scrollTop+e.target.clientHeight < e.target.scrollHeight) & (e.target.deltaY>0))){
      // }
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

  const onTooltipClickHandler = ()=>{
    navigator.clipboard.writeText('ukthakur00@gmail.com')
  }

  const nameRef = useRef(), emailRef = useRef(), phoneRef = useRef(), messageRef = useRef()

  const onSendHandler = (e)=>{
    e.preventDefault()
    const message = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      message: messageRef.current.value,
    }
    nameRef.current.value = ''
    emailRef.current.value = ''
    phoneRef.current.value = ''
    messageRef.current.value = ''

    sendMessage(message)
    console.log('SENT')
  }

  return (
    <div className="App" onWheel={()=>onWheelHandler}>

      <div className='header'>
        {/* <div className='logo'>
          <svg  width='36px' height='50px' viewBox='0 0 50 50'>
            <text x="0" y="50" font-size="50px" font-family="monospace">🤘🏿</text>
          </svg>
        </div> */}
        <div className='button_container'>  
          <button onClick={onClickHandler(0)} className={`${page==0?'active':''}`}>About</button>
          <button onClick={onClickHandler(1)} className={`${page==1?'active':''}`}>Work</button>
          <button onClick={onClickHandler(2)} className={`${page==2?'active':''}`}>Contact</button>
          <button onClick={()=>{window.open('https://drive.google.com/file/d/1QKuxRgJml3a7ktOy9TEsjOOVZG1hIsTe/view?usp=sharing')}} className=''>Resume</button>
        </div>
      </div>

      <div className='page_container' style={{'--pageno':page}}>

      <Page id={0}>
        <div id='about_page'>
          {windowWidth<100 ? <h2 id='canvas_alt_hello_txt'>HELLO</h2> :
          <canvas id='canvas_hello' ref={canvasRef} width={800} height={400} ></canvas>}
          <div className='about_text'>
            <h4>I'm <img className='name_cursive' src={NameCursive} alt="name_cursive"/>,
              a Business analyst.</h4>
            <div>
              <p>I'm also a front-end developer and have keen interest in creative coding.</p>
              <p>Currently exploring D3.js</p>
            </div>
          </div>
        </div>
      </Page>

      <Page id={1}>
        <div id='projects_page'>
            <h2>Coming up</h2>
        </div>
      </Page>

      <Page id={2}>
        <div id='contact_page'>
          
          <h2>Get in touch </h2>

          <div className='contact_form_container'>

            <form action="" method="POST"  onSubmit={onSendHandler} id="contact_form">
              <label htmlFor="name"></label>
              <input ref={nameRef} type="text" name="name" defaultValue="" id="name" placeholder='Name*' required />

              <label htmlFor="email"></label>
              <input ref={emailRef} type="email" name="email" defaultValue="" id="email" placeholder='Email*' required />

              <label htmlFor="phone"></label>
              <input ref={phoneRef} type="tel" name="phone" defaultValue="" id="phone" placeholder='Phone' />

              <label htmlFor="message"></label>
              <textarea ref={messageRef} type="text" name="message" defaultValue="" id="message" placeholder="Drop your thoughts here, and let's start an exciting conversation. 🚀" rows={4} onWheel={onScrollHandler} required />

              <button type='submit'> Send </button>
            </form>

            
            <div className='social_links'>
              <div className='email' onClick={onTooltipClickHandler}>
                <Email width='30px' height='30px' fill='#000'/>
              </div>
              <div className='linkedin'>
                <a href='https://www.linkedin.com/in/ujjwal-kumar-ba48941a1/' target='blank'>
                  <Likendin width='30px' height='30px' fill='#000'/>
                </a>
              </div>
              <div className='linkedin'>
                <a href='https://observablehq.com/@ukumar' target='blank'>
                  <Observable width='30px' height='30px' fill='#000'/>
                </a>
              </div>
            </div>
            
          </div>

        </div>
      </Page>

    </div>
    
  </div>
  )
}

export default App;