import React from 'react'
import {useNavigate} from 'react-router-dom'
import {preview} from '../assets';
import { getRandomPrompt } from '../utils';
import {FormField, Loader} from '../components';
import { useState } from 'react';




const CreatePost = () => {
const navigate = useNavigate();
const [form,setForm] = useState({
  name:'',
  prompt:'',
  photo:'',
})

const [generatingImg, setGeneratingImg] = useState(false);
const [loading, setLoading] = useState(false);

//WE CAN MAKE A CALL TO THE BACKEND THAT WE HAVE CREATED FROM THE generateImage function.
const generateImage = async () => {
  if(form.prompt) {
    try {
      setGeneratingImg(true); //starting the image generation
      const response = await fetch('http://localhost:8080/api/v1/dalle', {
        method:'POST',   //Object of options
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({prompt: form.prompt}), //finally we pass in all the data required to our backend to then get back the response, which gives us the AI GENERATED IMAGE
      })
// To parse the data and to see it
      const data = await response.json()
// Once we get the data, we can set it to the current state
      setForm({...form, photo: `data:image/jpeg;base64,${data.photo}`}) // This is the way in which we save and render our image

    } catch (error) {
      alert(error);
      // if error, we set the generating image to false
    } finally {
      setGeneratingImg(false);
    }
  } else {
    alert('Please enter a prompt, try harder')
  }

};

const handleSubmit = async (e) => {
e.preventDefault();
if (form.prompt && form.photo) {
  setLoading(true);
  try {
    const response = await fetch('http://localhost:8080/api/v1/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    })
    
    await response.json();
    navigate('/');

  } catch (error) {
    alert(err)
  } finally {
    setLoading(false)
  } 
  }else {
    alert('Please try again')
}
}
 const handleChange= (e) => {
  setForm({...form, [e.target.name]: e.target.value})

 }

 const handleSurpriseMe = () => {
  const randomPrompt = getRandomPrompt(form.prompt)
  setForm({...form, prompt: randomPrompt})

 }

  return (
    <section className='max-w-7xl mx-auto'>
       <div><h1 className='font-extrabold text-[#060202] text-[48px]'>Create</h1>
        <p className='mt-3 text-[#0070ad] text-[24px] max-w[500px]'>
        Create images using prompts powered by DALL-E AI.</p></div>

        <form className='mt-14 max-w-3xl' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-5'>
            <FormField LabelName="Your Name" type= "text"
            name= "name"
            placeholder="Lalit Aradhya"
            value={form.name}
            handleChange={handleChange} />

             <FormField LabelName="Prompt"
            type= "text"
            name= "prompt"
            placeholder="A plush toy robot bear sitting against a yellow wall smiling"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe= {handleSurpriseMe} />

            <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
              {form.photo ? (
                <img src= {form.photo}
                alt = {form.prompt}
                className = 'w-full h-full object-contain' />
              ): (
                <img src={preview} alt="preview" className='w-9/12 h-9/12 object-contain opacity-40' />
              )
              }

              {generatingImg && (
                <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                  <Loader />

                </div>
              )}
            </div>

          </div>
          <div className='mt-5 flex gap-5'>
            <button type = 'button'
            onClick={generateImage}
            className = "text-white bg-[#33b569] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {generatingImg ? 'Patience Please...' : 'Generate'}
            </button>

          </div>
          <div className='mt-10'>
            <p className='mt-2 text-[#666e75] text-[14px]'>Once you generate the image, you can view it in the homepage.</p>
<button type='submit' className='mt-3 text-white bg-[#0070ad] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-cener'>
  {loading ? 'Wait ra...':'View it now'}
</button>
          </div>
        </form>
    </section>
  )
}

export default CreatePost