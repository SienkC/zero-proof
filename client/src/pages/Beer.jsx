import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import RecipeItem from '../components/RecipeItem';
import brooklyn from '../assets/brooklyn-eff.jpg';
import athletic from '../assets/athletic.jpg';
import lagunitas from '../assets/lagunitas.jpg';

import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';

import { QUERY_THOUGHTS } from '../utils/queries';


const Beer = () => {

        
    return (
            <main className='w-full min-h-screen bg-fixed bg-repeat relative bg-cover bg-[url("./assets/pexels-rachel-claire-5863518.jpg")]'>
              {/* <div className=> */}
              <div className="row relative w-full h-36"></div>
              <h2 className="feature-sign p-4 mt-2">Featured</h2>
             <div className="mt-8 p-0 flex justify-center items-center">
                <div className="flex flex-col justify-center">
                <div className='grid grid-cols-3 gap-12'>
                    
                    <Link to='/'>
                    <div className='backdrop-blur'>
                    <h4 className="title-sign">Brooklyn Effects</h4>
                  <div className="text-white p-8 text-center">
                    <img src ={brooklyn} alt="brooklyn effects na beer" className="w-72 h-80" />
                  </div>
                  </div>
                  </Link>
        
                  <Link to='/'>
                  <div className='backdrop-blur'>
                    <h4 className="title-sign">Athletic Brewing</h4>
                  <div className="text-white p-8 text-center">
                    <img src ={athletic} alt="brooklyn effects na beer" className="w-72 h-80" />
                  </div>
                  </div>
                  </Link>
        
                  <Link to='/'>
                  <div className='backdrop-blur'>
                    <h4 className="title-sign">Lagunitas Hoppy Refresher</h4>
                  <div className="text-white p-8 text-center">
                    <img src ={lagunitas} alt="brooklyn effects na beer" className="w-72 h-80" />
                  </div>
                  </div>
                  </Link>


                  
                </div>
                </div>
              </div>
              <ThoughtForm />
              {/* </div> */}
            </main>
          );
        };
export default Beer;