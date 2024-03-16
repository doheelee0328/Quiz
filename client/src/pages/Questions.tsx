import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setScore } from '../slices/questions'
import Button from '../components/Buttons'
import { useNavigate } from 'react-router-dom'
import '../scss/main.scss'
import Spinner from '../components/Spinner'

const Questions = () => {
  const [questions, setQuestions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectOption, setSelectOption] = useState('')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([])
  const [message, setMessage] = useState('')
  const [timer, setTimer] = useState(20)

  const selectedCategory = useSelector(
    (state: any) => state.questionSlice.selectedCategory
  )
  const difficulty = useSelector(
    (state: any) => state.questionSlice.selectedDifficulty
  )
  const score = useSelector((state: any) => state.questionSlice.score)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const fetchQuestions = async (retryCount = 3) => {
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=5&category=${selectedCategory.id}&difficulty=${difficulty}&type=multiple`
      )

      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After')
        const delay = retryAfter ? parseInt(retryAfter) * 1000 : 1000 // Default to 1 second delay if no Retry-After header provided

        if (retryCount > 0) {
          setTimeout(() => {
            fetchQuestions(retryCount - 1)
          }, delay)
        } else {
          // Handle error or display a message
          console.error('API rate limit exceeded')
          // Optionally, set loading state to false to stop continuous loading
          setLoading(false)
        }

        return
      }

      const data = await response.json()
      setQuestions(data.results)
      setLoading(false)
    } catch (error) {
      console.error(error)
      if (retryCount > 0) {
        setTimeout(() => {
          fetchQuestions(retryCount - 1)
        }, 1000) // Retry after 1 second
      } else {
        // Handle error or display a message
        console.error('Error fetching data')
        // Optionally, set loading state to false to stop continuous loading
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    if (questions.length > 0) {
      const shuffled = shuffleQuestions(
        questions[currentQuestionIndex].correct_answer,
        questions[currentQuestionIndex].incorrect_answers
      )
      setShuffledOptions(shuffled)
      setTimer(20)
    }
  }, [questions, currentQuestionIndex])

  const shuffleQuestions = (
    correctAnswer: string,
    incorrectAnswer: string[]
  ) => {
    const options = [...incorrectAnswer, correctAnswer]
    return options.sort(() => Math.random() - 0.5)
  }

  const handleSelectOption = (option: string, correctAnswer: string) => {
    setSelectOption(option)
    if (option === correctAnswer) {
      dispatch(setScore(score + 1))
    }
  }

  const handleNextQuestion = () => {
    if (!selectOption) {
      setMessage('Please select an answer')
      return
    } else if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectOption('')
      setMessage('')
      setTimer(20)
    }
  }

  const handleCompletedPage = () => {
    if (!selectOption) {
      setMessage('Please select an answer')
      return
    }
    navigate('/completed')
    setMessage('')
  }

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerId)
          if (currentQuestionIndex === questions.length - 1) {
            navigate('/completed')
          } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
            setMessage('')
            return 20 // Reset the timer to 20 when moving to the next question
          }
        }
        return prevTime - 1
      })
    }, 1000)

    // Clean up interval on component unmount
    return () => clearInterval(timerId)
  }, [currentQuestionIndex, questions])

  useEffect(() => {
    fetchQuestions()
  }, [])

  return (
    <div>
      {loading ? (
        <div className='spinner'>
          <Spinner />
        </div>
      ) : (
        questions &&
        questions.length > 0 && (
          <div>
            <div className='questions-container'>
              <p className='timer-container'>
                Time left <span className='timer'>{timer}</span>
              </p>

              <div className='question-answer-container'>
                <p className='questions'>
                  {questions[currentQuestionIndex].question}
                </p>
                <div className='questions-answers'>
                  {shuffledOptions.map((option, index) => (
                    <>
                      <Button
                        key={index}
                        title={option}
                        onClick={() =>
                          handleSelectOption(
                            option,
                            questions[currentQuestionIndex].correct_answer
                          )
                        }
                        active={selectOption === option}
                      />
                    </>
                  ))}
                </div>
                {currentQuestionIndex === questions.length - 1 ? (
                  <Button title='Submit Quiz' onClick={handleCompletedPage} />
                ) : (
                  <Button title='Next Question' onClick={handleNextQuestion} />
                )}
              </div>
              <div className='bottom-container'>
                {selectOption ? (
                  <p className='selected-option'>{`You have selected ${selectOption}`}</p>
                ) : (
                  message && <p className='error-selected-message'>{message}</p>
                )}

                <p className='out-of-questions'>{`${
                  currentQuestionIndex + 1
                }/5 questions`}</p>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default Questions
