import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "~/constants";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "AI-powered smart feedback for you dream job! " },
  ];
}

export default function Home() {
  // function callbackfn(value: Resume, index: number, array: Resume[]): ReactNode {
  //   throw new Error("Function not implemented.");
  // }
const { auth} = usePuterStore();
const navigate= useNavigate();

useEffect(() => {
  if(!auth.isAuthenticated) navigate('/auth?next=/');   //this a redirection, if user tries to access the auth page while being authenticated, it will redirect them to the next page if not logged in they gonna blocked at auth page
 
},  [auth.isAuthenticated])

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
   <Navbar></Navbar>
   


    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Welcome to Resumind</h1>
        <h2>Track your Applications & Resume Ratings</h2>
        <h3>Review your submission and check AI-powered feedback.</h3>
      </div>
    


  {resumes.length > 0 && (
    <div className="resumes-section">
      {resumes.map((resume) => (
        <ResumeCard key={resume.id} resume={resume} />
      ))}
    </div>
  )}
  </section>  
  

  </main>
}
