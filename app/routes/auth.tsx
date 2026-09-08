import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { usePuterStore } from '~/lib/puter'
export const meta:() => {}[] =() => ([
  {title:"Reumind | Auth"},
  {name:'description', content:'Log into your account'},

])
const auth = () => {
const { isLoading , auth} = usePuterStore();
const location=useLocation();
const next:string = location.search.split('next=')[1];
const navigate= useNavigate();

useEffect(() => {
  if(auth.isAuthenticated) navigate(next);   //this a redirection, if user tries to access the auth page while being authenticated, it will redirect them to the next page if not logged in they gonna blocked at auth page
 
},  [auth.isAuthenticated, next])

  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className='gradiant-border shadow-lg'>
        <section className='flex flec-col gap-8 bg-white rounded-2xl p-10'>
          <div className='flex flex-col items-center gap-2 text-center'>
            <h1>Welcome</h1>
            <h2>Log in to continue your journey</h2>
          </div>
        </section>
      </div>
<div>
  {isLoading ?(
    <button className='auth-button animate-pulse' >
      <p>Signing you in...</p>
    </button>
   ) : (
    <>
    {auth.isAuthenticated ?(
      <button className='auth-button' onClick={auth.signOut}>
        <p>Log Out</p>
      </button>
    ) : (
      <button className='auth-button' onClick={auth.signIn}>
        <p>Log In</p>
      </button>
    )}

    </>
      )}
</div>

    </main>
  )
}

export default auth
   