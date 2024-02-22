import './index.css';
import Header from "../../components/header";
import { useEffect, useState, useRef } from "react";
import Loading from "../../components/loading";

import { FaGithub } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";


export default function Home(){
    const [loading, setLoading] = useState (true);
    const [about, setAbout] = useState ({});
    const [skills, setSkills] = useState ([]);
    const [projects, setProjects] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [indexFilter, setIndexFilter] = useState(0);
    const projectsContainerRef = useRef(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://portfbackend.vercel.app/date');
                if (!response.ok) {
                throw new Error('Erro ao buscar os dados');
                }
                const jsonData = await response.json();
                setAbout(jsonData.About);
                setSkills(jsonData.Skills);
                setProjects(jsonData.Projects);
                setContacts(jsonData.Contacts);
            } catch (error) {
                console.log(error)
            } finally {
                setTimeout(()=>{
                    setLoading(false);
                },2500)
            }
        };
        fetchData();
    }, []);
    
    const filterProjects = () =>{
        const firstFive = projects.slice(0, 3);
        const all = projects;

        return [firstFive, all];
    }

    const observeElements = () => {
        const myObserver1 = new IntersectionObserver((e)=>{
            e.forEach(items =>{
                if(items.isIntersecting){
                    items.target.classList.add('animateOpenLeftRemove');
                }else{
                    items.target.classList.remove('animateOpenLeftRemove');
                }
            })
        });
        const elements1 = document.querySelectorAll('.animateOpenLeft');
        if (elements1){
            elements1.forEach((e)=>myObserver1.observe(e))
        }

        const myObserver2 = new IntersectionObserver((e)=>{
            e.forEach(items2 =>{
                if (items2.isIntersecting){
                    items2.target.classList.add('animateInvisibleRemove');
                }else{
                    items2.target.classList.remove('animateInvisibleRemove');
                }
            })
        });
        const elements2 = document.querySelectorAll('.animateInvisible');
        if (elements2){
            elements2.forEach((e)=>myObserver2.observe(e));
        }

        const myObserver3 = new IntersectionObserver((e)=>{
            e.forEach(items =>{
                if(items.isIntersecting){
                    items.target.classList.add('animateOpenRightRemove');
                }else{
                    items.target.classList.remove('animateOpenRightRemove');
                }
            })
        });

        const elements3 = document.querySelectorAll('.animateOpenRight');
        if (elements3){
            elements3.forEach((e)=>myObserver3.observe(e))
        }
    };
    
    const changeFilter = (value) => {
        setIndexFilter(value);
    
        if (projectsContainerRef) {
            projectsContainerRef.current.classList.remove('animationFilterProject');
            void projectsContainerRef.current.offsetWidth;
            projectsContainerRef.current.classList.add('animationFilterProject');
    
            window.scrollTo({
                top: projectsContainerRef.current.offsetTop,
                behavior: 'smooth',
            });
        }

        setTimeout(observeElements, 1000);
    };
    
    useEffect(() => {
        if (!loading){
            observeElements();
        }
    }, [loading]);




    if (loading){
        return (
            <Loading/>
        )
    }

    return(
        <>  
            {about?(
                <Header value={about.Nick}/>
            ):null}
            <main className="main">
                {about ?(
                    <section className="section1">
                        <div className="section1Container">
                                <h1 className='h1-1 animateOpenLeft'>I'm</h1>
                                <h1 className='h1-2 animateOpenLeft'>
                                    {about.Title}
                                    <span> .</span>
                                </h1>
                        </div>
                    </section>
                ):null}

                {about ? (
                    <section className='section2'>
                        <div className='section2Container'>
                            <h2 className='animateOpenRight'>About me</h2>
                            <div className='AreaItens'>
                                <span className='imgMask'>
                                    <span className='imgMask2 animateOpenRight'>
                                        <img src={about.ProfilePhoto} alt={about.Name}/>
                                    </span>
                                </span>

                                <div className='aboutInfos animateOpenRight'>
                                    <p className='animateOpenRight'>My name is <b>{about.Name}</b></p>
                                    <p className='text animateOpenRight'>{about.About2}</p>

                                    <div className='contacts'>
                                        {contacts.length > 0 ?(
                                            <>
                                                {contacts.map((item, index)=>{
                                                    return(
                                                        <article key={item.Id}>
                                                            {item.TypePhone?(
                                                                <a href={`tel:${item.Direction}`} target='_blank'>{item.Plataform}</a>
                                                            ):(
                                                                <a href={item.Direction} target='_blank'>{item.Plataform}</a>
                                                            )}
                                                        </article>
                                                    )
                                                })}
                                            </>
                                        ):null}
                                    </div>
                                </div>
                            </div>
                        </div>  
                    </section>
                ):null}

                {skills.length > 0 ?(
                    <section className='section3'>
                        <div className='section3Container'>
                            <h2 className='animateOpenLeft'>Skills</h2>
                            <div className='skillsContainer'>
                                {skills.map((item2, index2)=>{
                                    return(
                                        <div key={item2.Id} className='skillsArea animateOpenLeft'>
                                            <img src={item2.Icon} alt={item2.Name}/>
                                            <p>{item2.Name}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </section>  
                ):null}

                {projects.length > 0 ?(
                    <section className='section4'>
                        <div className='section4Container'>
                            <h2 className='animateOpenRight'>Projects</h2>
                            <div className='containerProjects animationFilterProject' ref={projectsContainerRef}>
                                {filterProjects()[indexFilter].map((item, index)=>{
                                    return(
                                        <article key={item.Id} className='projectsArea animateOpenRight' >
                                            <div className='projectsInfo'>
                                                <h3>Project {index + 1}</h3>
                                                <h4>{item.Name}</h4>
                                                <p>{item.Description}</p>
                                                <div className='projectsLinks'>
                                                    <a href={item.GitHub} target='_Blank'><FaGithub/></a>
                                                    <a href={item.Deploy} target='_Blank'><FaArrowRight /> Project</a>
                                                </div>
                                            </div>
                                            <div className='imgProjectArea'>
                                                <span className='imgMask'>
                                                    <span className='imgMask2'>
                                                            <img src={item.Image} alt={item.Name}/>
                                                    </span>
                                                </span>
                                            </div>

                                        </article>
                                    )
                                })}
                            </div>
                            {indexFilter === 0 ?(
                                <button onClick={()=>changeFilter(1)}
                                className='buttonFilterProjects'>View all</button>
                            ):(
                                <button onClick={()=>changeFilter(0)}
                                className='buttonFilterProjects'>Less</button>
                            )}
                        </div>
                    </section>
                ):(
                    null
                )}

                <footer className='footer animateInvisible'>
                    <div className='footerContainer'>
                        <h3>Contact me</h3>
                        <a href='https://drive.google.com/drive/folders/1ahWmDkGSpGq6Uh_YInjREO0NWXpRtopH?usp=sharing'
                        target='_blank'>View Resume</a>
                    </div>
                </footer>

            </main>
        </>
    )
}