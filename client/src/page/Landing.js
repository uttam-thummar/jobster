import React from 'react';
import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg';
import { Link } from 'react-router-dom';
import { Logo } from '../components';

const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className="container page">
                {/* info */}
                <div className="info">
                    <h1>
                        Job <span>Traking App</span>
                    </h1>
                    <p>
                        Crucifix narwhal street art asymmetrical, humblebrag tote bag pop-up
                        fixie raclette taxidermy craft beer. Brunch bitters synth, VHS
                        crucifix heirloom meggings bicycle rights.
                    </p>
                    <Link to='/register' className='btn btn-hero'>
                        Login / Register
                    </Link>
                </div>
                <img src={main} alt="Job Hunt" className='img main-img' />
            </div>
        </Wrapper>
    )
}

export default Landing
