import React from "react"
import './Resume.css'

import Phone from "./Phone.svg"
import Linkedin from "./Linkedin.svg"
import Gmail from "./Gmail.svg"


const Resume = ()=>{
    return <div id='resume'>
        <div className="intro">
            <h2 className="name">Ujjwal Kumar</h2>
            <h4>Analyst</h4>
            <div className="intro-body">
                Analyst having excellent problem solving and
                analytical skills especially interested in learning
                advanced data visualization techniques
            </div>
        </div>
        <div className='contact'>
            <div className="email" style={{display: 'flex', alignItems:'center'}}>
                <img src={Gmail} alt="gmail" width={20}/>
                ukthakur00@gmail.com
            </div>
            <div className="phone" style={{display: 'flex', alignItems:'center'}}>
                <img src={Phone} alt="phone_logo" width={20}/>
                8864859618
            </div>
            {/* <div className="location">Gurugram, India</div> */}
            <div className="linkedin" style={{display: 'flex', alignItems:'center'}}>
                <img src={Linkedin} alt="linkedin" width={20}/>
                <a href="https://www.linkedin.com/in/ujjwal-kumar-ba48941a1/">linkedin</a>
            </div>
        </div>
        <div className="education">
            <h3>EDUCATION</h3>
            <div>B.Tech (Biotechnology)</div>
            <div><span>Indian Institute of Technology, Roorkee</span> <span>2018 - 2022</span></div>
        </div>
        <div className="workEx">
            <h3>WORK EXPERIENCE</h3>
            <WorkEx role='Business Analyst' company='Citymall' start_date='06/2022' location='Gurugram, India'>
                <p> Worked in PostgreSQL and Pandas to setup alerts for operational performance metrics </p>
                <p> Reported insights and maintained dashboards for operational metrics </p>
                <p> Analyzed data to learn customer and community leader behaviour patterns and predict future behaviour </p>
            </WorkEx>

            <WorkEx role='Front End Web developer Intern' company='Fab Hotels' start_date='09/2021' end_date='02/2022' 
                location='Gurugram, India'>
                <p> Learnt basics of JavaScript and React and built components for few features in web app </p>
                <p> Refactored code and fixed bugs in existing React code </p>
            </WorkEx>

        </div>
    </div>
}

export default Resume


const WorkEx = ({role, company, start_date, end_date, location, children})=>(
    <div className="workEx-item">
        <h4 className="workEx-item-role">{role}</h4>
        <h4><span>{company}</span> <i>{start_date} - {end_date ?? 'Present'}, {location}</i></h4>
        <p>{children}</p>
    </div>
)



// linkedin.com/in/ujjwal-kumar-ba48941a1

// SKILLS
// SQL Python Excel
// Data Visualization JavaScript
// React D3
// LANGUAGES
// English
// Full Professional Proficiency
// Hindi