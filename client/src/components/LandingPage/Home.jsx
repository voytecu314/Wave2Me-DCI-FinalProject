import React from 'react';
import Logo from '../Logo';

const Home = () => {
  return (
    <>
    <main>
        <Logo/>
        <br /><br /><br />
        <section>
            <div>
                <form action="">
                    <input id='midlane' type="email" name='email' placeholder='Email'/>
                    <br />
                    <input id='midlane' type="password" name='password' placeholder='Password'/>
                    <br />
                    <input id='midlane' type="submit"/>
                </form>
            </div>
        </section>
    </main>

    
    
    </>
    
  )
}

export default Home