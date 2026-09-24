import { useActionState, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router"
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import Summary from "~/components/Summary";
import { usePuterStore } from "~/lib/puter";

export const meta: () => {}[] = () => ([
    { title: "Reumind | Review" },
    { name: 'description', content: 'detailed overview of your resume' },

])


const Resume = () => {
    const { auth, isLoading, fs, kv } = usePuterStore();


    const { id } = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeurl] = useState('');
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const navigate = useNavigate();




useEffect(() => {
  if(!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume${id}`);   //this a redirection, if user tries to access the auth page while being authenticated, it will redirect them to the next page if not logged in they gonna blocked at auth page
 
},  [isLoading])



    useEffect(() => {
        const loadResume = async () => {
            const resume = await kv.get(`resume:${id}`);

            if(!resume) return;

            const data =JSON.parse(resume);

            const resumeBlob = await fs.read(data.resumePath);
            if(!resumeBlob) return;
            const pdfBlob =new Blob ([resumeBlob], {type: 'application/pdf'});
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeurl (resumeUrl);

            const imageBlob = await fs.read(data.imagePath );
            if(!imageBlob) return;

            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl (imageUrl);

            setFeedback(data.feedback);
            console.log( {resumeUrl, imageUrl, feedback: data.feedback});




        }
    
    
        loadResume();
    }, [id]);




    return (
        <main className="!pt-0">
            <nav className="resume-nav">
                <Link to="/" className="back-button">
                    <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
                    <span className="text-grey-500 text-sm font-semibold">Back to Homepage</span>
                </Link >

            </nav>
            <div className="flex flex-row w-full max-lg:flex-col-reverse" >
                <section className="feedback-section  bg-[url('/images/bg-small.svg') bg-cover h-[100vh] sticky top-0 items-center justify-center" >
                    {imageUrl && resumeUrl && (
                        <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
                        <a href={resumeUrl} target="-blank" rel="noopener noreferrer">
                            <img src={imageUrl} 
                            className="w-full h-full object-contain rounded-2xl"
                            title="resume" 
                            />


                        </a>
                        
                        </div>
                    )}

                </section>
            <section className="feedback-section">
                <h2 className="text-4xl !text-black font-bold"> Resume Review</h2>

                {feedback? (
                <div className="flex felx-col gap-8 animate-in fade-in duration-1000 ">
                    <Summary feedback={feedback} />
                    <ATS score={feedback.ATS.score || 0 } 
                    suggestions={feedback.ATS.tips || []}/>
                    <Details feedback={feedback} />

                </div>    
                ): (
                    <img src="/images/resume-scan-2.gif" className="w-full" />
                )}
            </section>


            </div>

        </main>
    )
}

export default Resume

