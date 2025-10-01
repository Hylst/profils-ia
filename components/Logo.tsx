/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

const Logo: React.FC = () => {
    return (
        <div className="flex flex-col items-center text-center">
            <svg width="128" height="128" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
                <path d="M256 512C397.385 512 512 397.385 512 256C512 114.615 397.385 0 256 0C114.615 0 0 114.615 0 256C0 397.385 114.615 512 256 512Z" fill="black"/>
                <path d="M228.857 128C194.857 130.667 154.524 162.2 159.238 226.4C163.952 290.6 221.714 364.8 296.762 364.8C371.81 364.8 402.667 301.867 393.143 256C383.619 210.133 323.81 169.6 276.571 185.6" stroke="#FACC15" strokeWidth="24" strokeLinecap="round"/>
                <path d="M307.429 112L323.81 70.4L366.19 86.8L350.59 128.8L307.429 112Z" fill="#FACC15"/>
            </svg>
            <h1 className="text-6xl md:text-8xl font-caveat font-bold text-neutral-100">Ton Profil IA</h1>
            <p className="font-permanent-marker text-neutral-300 mt-2 text-xl tracking-wide">Réinventez votre image. Explorez les styles.</p>
        </div>
    );
};

export default Logo;
