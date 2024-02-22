import "./index.css"
import Header from "../../components/header";
import Loading from "../../components/loading";
import { useEffect, useState, useCallback} from "react";

function Home (){
    const [loading, setLoading] = useState (true);
    const [about, setAbout] = useState ({});
    const [skills, setSkills] = useState ([]);
    const [skillsIndex, setSkillsIndex] = useState(0);
    const [projects, setProjects] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [filterProjectsIndex, setFilterProjectsIndex] = useState(0);

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
                },2000)
            }
        };
        fetchData();
    }, []);
    

    const changeIcon = useCallback(() => {
        const timeOutChangeIcon = setInterval(() => {
            setSkillsIndex(prevIndex => (prevIndex + 1) % skills.length);
        }, 2000);
        return () => clearInterval(timeOutChangeIcon);
    }, [skills]);
    
    useEffect(() => {
        if (!loading) {
            const cleanUp = changeIcon();
            return () => cleanUp();
        }
    }, [changeIcon, loading]);
    

    const filterProjects = () => {
        const firstFive = projects.slice(0, 3);
        const all = projects;

        return [firstFive, all];
    };
    
    const changeFilter = (value) => {
        setFilterProjectsIndex(value);
        const projectsDiv = document.querySelector('#projects');
    
        if (projectsDiv) {
            projectsDiv.classList.remove('addAnimationFilter');
            void projectsDiv.offsetWidth;
            projectsDiv.classList.add('addAnimationFilter');
        }
    
        if (value === 0) {
            // Se o valor for 0, a sessão de projetos foi minimizada, então rolar de volta para o início da sessão de projetos

        }
    }
    
    

    useEffect(() => {
        if (!loading) {
            const myObserver = new IntersectionObserver((entries) => {
                entries.forEach(e => {
                    if (e.isIntersecting){
                        e.target.classList.add('scrollAnimte1Remove')
                    }else{
                        e.target.classList.remove('scrollAnimte1Remove')
                    }
                });
            });
            const elements = document.querySelectorAll('.scrollAnimte1');
            elements.forEach((e)=> myObserver.observe(e));
            
            const myObserver2 = new IntersectionObserver((entries2)=>{
                entries2.forEach(e2 =>{
                    if (e2.isIntersecting){
                        e2.target.classList.add('scrollAnimte2Remove')
                    }else{
                        e2.target.classList.remove('scrollAnimte2Remove')
                    }
                });
            })
            const elements2 = document.querySelectorAll('.scrollAnimte2');
            elements2.forEach((e2)=> myObserver2.observe(e2));

            const myObserve3 = new IntersectionObserver((entries3) => {
                if (entries3[0].isIntersecting) {
                    element3.classList.add('footerRemove');
                } else {
                    element3.classList.remove('footerRemove');
                }
            });
            
            const element3 = document.querySelector('.footer');
            myObserve3.observe(element3);
            
        }
    }, [loading]);

    const loadingIcons = () =>{
        const list = []
        for (let x = 0; x < skills.length; x++){
            list.push(<span key={x} style={{ 
                backgroundColor: 'white', 
                width: '8px', 
                aspectRatio:'1/1', 
                display: 'block', 
                borderRadius: '100px', 
            }} className={`${x === skillsIndex ? '' : 'keyframesBalls'}`}>
            </span>)
        }
        return (
            <div style={{width:'100%',display:'flex', alignItems:'center', justifyContent:'center', gap:'4px'}}>
                {list}
            </div>
        )
    }
    
    if (loading){
        return (
            <Loading/>
        )
    }


    return(
        <>  
            {about ?(
                <Header value={about.Nick}/>
            ):null}
            <main className="main">
                {about?(
                    <section className="sectionIntro" id="about">    
                        <h1 className="scrollBox scrollAnimte1">{about.Title}</h1>
                        <p className="scrollBox scrollAnimte1">{about.About1}</p>
                    </section>
                ):null}

                {projects.length > 0 ?(
                    <section className="sectionProjects initScroll" id="projects">
                        <h2>Projects</h2>
                        <div className="scrollAnimte1 allProjects">
                            {filterProjects()[filterProjectsIndex].map((itemProjects, indexProjects) => (
                                <article key={itemProjects.Id} className="containerProjects">
                                    <div className="imgMask scrollImg">
                                        <img src={itemProjects.Image} alt={itemProjects.Name}/>
                                    </div>
                                    <p>{itemProjects.Name}</p>
                                </article>
                            ))}
                        </div>
                        {filterProjectsIndex === 0 ? (
                            <button className="allButton" onClick={()=>changeFilter(1)}>All - {projects.length} </button>
                        ):(
                            <button className="allButton" onClick={()=>changeFilter(0)}>Less</button>
                        )}
                        
                    </section>
                ):null}

                {about?(
                    <section className="sectionAbout initScroll" id="about">
                        <div className="left">
                            <h2 className="scrollAnimte1">About me</h2>
                            <div className="imgMask scrollAnimte1">
                                <img src={about.ProfilePhoto} alt={about.Name}/>
                            </div>
                            <div className="letters">
                                <h2 className="scrollAnimte1">Hi</h2>
                                <p className="scrollAnimte1">{about.About2}</p>
                            </div>
                        </div>
                        {skills.length > 0 ?(
                            <div className="right">
                                <h2 className=" scrollAnimte2">Skills</h2>
                                <div className="AllSkillsContainer scrollAnimte2">
                                    {skills.map((itemSkills, indexSkills)=>{
                                        return(
                                            <img key={itemSkills.Id} src={itemSkills.Icon} alt={itemSkills.Name} />
                                        )
                                    })}
                                </div>
                            </div>
                        ):null}
                        
                    </section>
                ):null}
                {skills.length > 0 ?(
                    <section className="sectionSkills">
                        <span className="areaSkills">
                            <span className="darkArea">
                            </span>
                            <div className="iconArea">
                                {skills[skillsIndex].Icon?(
                                    <>
                                        <img src={skills[skillsIndex].Icon} alt={skills[skillsIndex].Name}/>
                                        {loadingIcons()}
                                    </>
                                ):null}
                            </div>
                        </span>
                    </section>
                ):null}
                    <footer className="footer">
                        {contacts.length > 0 ?(
                            <>
                                {contacts.map((contactsItems, contactsIndex)=>{
                                    return(
                                        <ul key={contactsItems.Id}>
                                            {contactsItems.TypePhone?(
                                                <li><a href={`tel:${contactsItems.Direction})`}>{contactsItems.Plataform}</a></li>
                                            ):(
                                                <li><a href={contactsItems.Direction} target="_blank">{contactsItems.Plataform}</a></li>
                                            )}
                                        </ul>
                                    )
                                })}
                            </>
                        ):null}
                    </footer>
            </main>
                
        </>
    )
}

export default Home;