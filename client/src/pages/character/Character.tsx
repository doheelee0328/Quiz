import React, { useState } from 'react'
import '../../scss/main.scss'
import Duck1 from '../../images/duck1.png'
import Duck2 from '../../images/duck2.png'
import Duck3 from '../../images/duck3.png'
import Duck4 from '../../images/duck4.png'
import Duck5 from '../../images/duck5.png'
import Duck6 from '../../images/duck6.png'
import Duck7 from '../../images/duck7.png'
import Duck8 from '../../images/duck8.png'
import Duck9 from '../../images/duck9.png'
import { useNavigate } from 'react-router-dom'
import { changeCharacter } from '../../slices/character'
import { useDispatch } from 'react-redux'
import Button from '../../components/Buttons'
import Logo from '../../components/Logo'

interface CharacterProps {
  image: any
  alt: string
  selectedImage: any
  dataCy: string
}

const CharacterImages = ({
  image,
  alt,
  selectedImage,
  dataCy,
}: CharacterProps) => {
  const dispatch = useDispatch()

  const selectCharacterHandler = (selectedCharacter: any) => {
    if (selectedCharacter) {
      dispatch(changeCharacter(selectedCharacter))
      localStorage.setItem('character-image', selectedCharacter)
      selectedImage('Your character has been chosen')
    }
  }

  return (
    <div className='image-container'>
      <img
        src={image}
        alt={alt}
        className='duck-image'
        onClick={() => selectCharacterHandler(image)}
        data-cy={dataCy}
      />
    </div>
  )
}

const Character = () => {
  const [selectedImageMessage, setSelectedImageMessage] = useState<string>('')

  const navigate = useNavigate()
  const navigateToLoginPage = () => {
    if (selectedImageMessage === 'Your character has been chosen') {
      navigate('/login')
    } else {
      setSelectedImageMessage('Please select your character')
    }
  }

  return (
    <div className='character-container'>
      {/* <Logo /> */}
      <h1 className='character-heading' data-cy='character-heading'>
        Choose Your Duck
      </h1>
      <div className='row-character'>
        <CharacterImages
          image={Duck1}
          alt='duck1'
          selectedImage={setSelectedImageMessage}
          dataCy='duck-image'
        />
        <CharacterImages
          image={Duck2}
          alt='duck2'
          selectedImage={setSelectedImageMessage}
          dataCy='duck-image'
        />
        <CharacterImages
          image={Duck3}
          alt='duck3'
          selectedImage={setSelectedImageMessage}
          dataCy='duck-image'
        />
      </div>
      <div className='row-character'>
        <CharacterImages
          image={Duck4}
          alt='duck4'
          selectedImage={setSelectedImageMessage}
          dataCy='duck-image'
        />
        <CharacterImages
          image={Duck5}
          alt='duck5'
          selectedImage={setSelectedImageMessage}
          dataCy='duck-image'
        />
        <CharacterImages
          image={Duck6}
          alt='duck6'
          selectedImage={setSelectedImageMessage}
          dataCy='duck-image'
        />
      </div>
      <div className='row-character'>
        <CharacterImages
          image={Duck7}
          alt='duck7'
          selectedImage={setSelectedImageMessage}
          dataCy='duck-image'
        />
        <CharacterImages
          image={Duck8}
          alt='duck8'
          selectedImage={setSelectedImageMessage}
          dataCy='duck-image'
        />
        <CharacterImages
          image={Duck9}
          alt='duck9'
          selectedImage={setSelectedImageMessage}
          dataCy='duck-image'
        />
      </div>
      <div className='character-button-container'>
        <Button
          title='Next'
          onClick={navigateToLoginPage}
          dataCy='next-button'
        />
      </div>
      {selectedImageMessage && (
        <p
          className='character-chosen-message'
          data-cy='character-chosen-message'
        >
          {selectedImageMessage}
        </p>
      )}
    </div>
  )
}

export default Character
