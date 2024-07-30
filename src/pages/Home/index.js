import './index.css';
import Header from "../../components/header";
import { useEffect, useState, useRef, useContext } from "react";
import { LanguageContext } from '../../contexts/languageControl';
import Loading from "../../components/loading";
import { FaGithub } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import ScrollTop from '../../components/scrollTop';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { toast } from 'react-toastify';
import {isEmail} from 'validator';
import emailjs from "@emailjs/browser";

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [loadingButton, setLoadingButton] = useState(false);
    const { isBr } = useContext(LanguageContext);
    const [data, setData] = useState(null);
    const [viewLess, setViewLess] = useState(true);
    const projectsContainerRef = useRef(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function getItens() {
            setLoading(true);
            setTimeout(async()=>{
                try {
                    const ptbr = await import('../../services/ptbr.json');
                    const en = await import('../../services/en.json');
    
                    if (isBr) {
                        setData(ptbr.default);
                    } else {
                        setData(en.default);
                    }
                } catch (error) {
                    console.error("Error loading JSON files:", error);
                } finally {
                    setLoading(false);
                }
            },1000)
        }

        getItens();
    }, [isBr]); 

    const viewMoreProjects = (value) => {
        setViewLess(value);

        if (projectsContainerRef.current) {
            projectsContainerRef.current.classList.remove('animationFilterProject');
            void projectsContainerRef.current.offsetWidth; 
            projectsContainerRef.current.classList.add('animationFilterProject');

            window.scrollTo({
                top: projectsContainerRef.current.offsetTop,
                behavior: 'smooth',
            });
        }

        setTimeout(observeElements, 600);
    };

    const observeElements = () => {
        const observers = [
            { className: '.animateOpenLeft', addClass: 'animateOpenLeftRemove' },
            { className: '.animateInvisible', addClass: 'animateInvisibleRemove' },
            { className: '.animateOpenRight', addClass: 'animateOpenRightRemove' },
        ];

        observers.forEach(({ className, addClass }) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(addClass);
                    } else {
                        entry.target.classList.remove(addClass);
                    }
                });
            });

            document.querySelectorAll(className).forEach((el) => observer.observe(el));
        });
    };

    useEffect(() => {
        if (!loading) {
            observeElements();
        }
    }, [loading]);
    
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 999999999999, min: 1366 },
            items: 3
        },
        desktop: {
            breakpoint: { max: 1366, min: 768 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 768, min: 600 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 600, min: 0 },
            items: 1
        }
    };

    async function sendEmail(e){
        e.preventDefault();
        if (!name || !email || !message){
            toast.warning(isBr?'Preencha todos os campos':'Fill in all fields');
            return;
        }

        if (!isEmail(email)){
            toast.warning(isBr?'Digite um endereço de e-mail válido' : 'Enter a valid email address');
            return;
        }
        setLoadingButton(true);
        
        const serviceId = process.env.REACT_APP_SERVICE;
        const templateId = process.env.REACT_APP_TEMPLATE;
        const publicKey = process.env.REACT_APP_PUBLICKEY;
        
        emailjs.init(publicKey);
        
        const dataEmail = {
            Name:name,
            From:email,
            Message:message
        }
        
        await emailjs.send(serviceId, templateId,dataEmail).then(()=>{
            toast.success(isBr?'E-mail enviado com sucesso' : 'Email successfully sent');
            setEmail('');
            setName('');
            setMessage('');
        }).catch((error)=>{
            toast.error(isBr?'Erro ao enviar e-mail':'Error sending email');
            console.log(error)
        }).finally(()=>{
            setLoadingButton(false);
        })
    }


    if (loading || data === null) {
        return <Loading />;
    }

    return (
        <>  
            <ScrollTop/>
            <Header value={'Ferndsgabriel'} />
            <main className="main">
                {data.Presentation ? (
                    <section className="section1">
                        <div className="section1Container">
                            <div>
                                <h1 className='h1-1 animateOpenLeft'>
                                    {isBr? 'Olá, eu sou' : "Hi, i'm" }
                                </h1>
                                <h1 className='h1-2 animateOpenLeft'>
                                    {data.Presentation.Resume}
                                </h1>
                            </div>
                        </div>
                    </section>
                ):null}

                {data.About && (
                    <section className='section2' id='about'>
                        <div className='section2Container'>
                            <h2 className='animateOpenRight'>
                                {isBr? 'Sobre mim' : 'About me'}
                            </h2>
                            <div className='AreaItens'>
                                <span className='imgMask animateOpenRight'>
                                    <img src={data.Perfil} alt={"Perfil"} />
                                </span>

                                <div className='aboutInfos animateOpenRight'>
                                    <p className='animateOpenRight'>{isBr? 'Meu nome é ' : 'My name is '} 
                                        <b>{data.About.Name}</b>
                                    </p>
                                    <p className='text animateOpenRight'>{data.About.Text}</p>

                                    <div className='contacts'>
                                        {data.Links && data.Links.length > 0 && data.Links.map((item, index) => (
                                            <article key={index}>
                                                <a href={item.Url} target='_blank' rel="noopener noreferrer">{item.Name}</a>
                                            </article>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>  
                    </section>
                )}

                {data.Skills.Itens && data.Skills.Itens.length > 0 && (
                    <section className='section3'>
                        <div className='section3Container'>
                            <h2 className='animateOpenLeft'>
                                {isBr? 'Habilidades' : 'Skills'}
                            </h2>
                            <div className='skillsContainer'>
                                {data.Skills.Itens.map((item, index) => (
                                    <div key={index} className='skillsArea animateOpenLeft'>
                                        <img src={item.Url} alt={item.Name} />
                                        <p>{item.Name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>  
                )}

                {data.Projects.Itens && data.Projects.Itens.length > 0 && (
                    <section className='section4' id='projects'>
                        <div className='section4Container'>
                            <h2 className='animateOpenRight'>{isBr? 'Projetos' : 'Projects'} - {data.Projects.Itens.length}</h2>
                            <div className='containerProjects animationFilterProject' ref={projectsContainerRef}>
                                {data.Projects.Itens.slice(0, !viewLess ? data.Projects.Itens.length : 3).map((item, index) => (
                                    <article key={index} className='projectsArea animateOpenRight'>
                                        <h3>{item.Name}</h3>
                                        <p>{item.Description}</p>
                                        <div className='technologiesArea'>
                                            {item.Technologies && item.Technologies.length > 0 && item.Technologies.map((tech, index) => (
                                                <img src={tech} alt='icon' key={index} />
                                            ))}
                                        </div>
                                        <img src={item.Image} alt={item.Name} className='projectImage' />
                                        <div className='projectLinks'>
                                            <a target='_blank' rel="noopener noreferrer" href={item.GitHub}><FaGithub /></a>
                                            <a target='_blank' rel="noopener noreferrer" href={item.Deploy}><FaArrowRight /></a>
                                        </div>
                                    </article>
                                ))}
                            </div>
                            {viewLess ? (
                                <button onClick={() => viewMoreProjects(false)} className='buttonFilterProjects animateOpenRight'>
                                    {isBr? 'Ver mais' : 'Show more'}
                                </button>
                            ) : (
                                <button onClick={() => viewMoreProjects(true)} className='buttonFilterProjects animateOpenRight'>
                                    {isBr? 'Ver menos' : 'Show less'}
                                </button>
                            )}
                        </div>
                    </section>
                )}

                {data.Certificates && data.Certificates.length > 0?(
                    <section className='section5'>
                        <div className='section5Container'>
                            <h2 className='animateOpenLeft'>
                                {isBr? 'Certificados' : 'Certificates'} 
                            </h2>
                            <Carousel responsive={responsive} className='animateOpenLeft'>
                                {data.Certificates.map((item, index)=>{
                                    return(
                                        <a key={index}
                                        className='containerCertificate' 
                                        data-description={item.Description}
                                        href={item.Link} target='_blank'>
                                            <h3>{item.Name} </h3> 
                                            <img src={item.Image} alt={item.Name}
                                            className='img'/>
                                        </a>
                                    )
                                })}
                            </Carousel>
                        </div>
                    </section>
                ):null}

                <section className='section6'>
                    <div className='section6Container'>
                        <h2 className='animateOpenRight'>{isBr? 'Me mande uma mensagem' : 'Send me a message'}</h2>
                        <p>
                            {isBr?'Tem uma pergunta ou proposta ou apenas quer dizer algo? Vá em frente.':
                            'Do you have a question or proposal or just want to say something? Go ahead.'}
                        </p>
                        <form className='sendEmail-form' onSubmit={sendEmail}>
                            <label className='labelForm animateOpenRight'>
                                <span>{isBr? 'Seu nome' : 'Your names'}</span>
                                <input type='text' required={true} minLength={3} maxLength={60}
                                placeholder={isBr?'Digite seu nome':'Enter your names'}
                                value={name} onChange={(e)=>setName(e.target.value)}/>
                            </label>

                            <label className='labelForm animateOpenRight'>
                                <span>{isBr? 'Seu email' : 'Your email'}</span>
                                <input type='text' required={true} minLength={6} maxLength={60}
                                placeholder={isBr?'Digite seu email':'Enter your email'}
                                value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            </label>

                            <label className='labelForm animateOpenRight'>
                                <span>{isBr? 'Sua mensagem' : 'Your message'}</span>
                                <textarea type='text' required={true} minLength={3} maxLength={600}
                                placeholder={isBr?'Digite sua mensagem':'Enter your message'}
                                value={message} onChange={(e)=>setMessage(e.target.value)}/>
                            </label>

                            <button type='submit' className='animateOpenRight' disabled={loadingButton}>Enviar</button>
                        </form>
                    </div>
                </section>


                <footer className='footer animateInvisible'>
                    <div className='footerContainer'>

                        <div className='linksFooter'>
                            <a href='https://drive.google.com/drive/folders/1ahWmDkGSpGq6Uh_YInjREO0NWXpRtopH?usp=sharing' target='_blank' rel="noopener noreferrer">
                                View Resume
                            </a>
                            <div className='linksContacts'>
                                {data.Links && data.Links.length > 0 && data.Links.map((item, index) => (
                                    <article key={index}>
                                        <a href={item.Url} target='_blank' rel="noopener noreferrer">{item.Name}</a>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
        </>
    );
}
