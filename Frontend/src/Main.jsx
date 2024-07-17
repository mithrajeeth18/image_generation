

import React, { useState } from 'react';
import { BsGrid1X2, BsFillImageFill, BsFolder } from 'react-icons/bs';
import { FaShapes, FaCloudUploadAlt } from 'react-icons/fa';
import { TfiText } from 'react-icons/tfi';
import { RxTransparencyGrid } from 'react-icons/rx';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom'; // Assuming you might need to use 'Link' and 'useLocation'

const Sidebar = () => {
    const [show, setShow] = useState({
        status: true,
        name: ''
    });

    const setElements = (type, name) => {
        // Your existing setElements function logic
    };

    // Define other functions and state variables needed for sidebar functionality

    return (
        <div className='w-[80px] bg-[#18191B] z-50 h-full text-gray-400 overflow-y-auto'>
            <div onClick={() => setElements('design', 'design')} className={` ${show.name === 'design' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                <span className='text-2xl'><BsGrid1X2 /></span>
                <span className='text-xs font-medium'>Design</span>
            </div>

            <div onClick={() => setElements('shape', 'shape')} className={`${show.name === 'shape' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                <span className='text-2xl'><FaShapes /></span>
                <span className='text-xs font-medium'>Shapes</span>
            </div>

            <div onClick={() => setElements('image', 'uploadImage')} className={`${show.name === 'uploadImage' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                <span className='text-2xl'><FaCloudUploadAlt /></span>
                <span className='text-xs font-medium'>Upload</span>
            </div>

            <div onClick={() => setElements('text', 'text')} className={`${show.name === 'text' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                <span className='text-2xl'><TfiText /></span>
                <span className='text-xs font-medium'>Text</span>
            </div>

            <div onClick={() => setElements('project', 'projects')} className={`${show.name === 'projects' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                <span className='text-2xl'><BsFolder /></span>
                <span className='text-xs font-medium'>Project</span>
            </div>

            {/* Add other sidebar items as needed */}

            <div onClick={() => setElements('background', 'background')} className={`${show.name === 'background' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                <span className='text-2xl'><RxTransparencyGrid /></span>
                <span className='text-xs font-medium'>Background</span>
            </div>
        </div>
    );
};

export default Sidebar;
