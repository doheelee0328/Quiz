import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setScore } from '../../slices/questions'
import Button from '../../components/Buttons'
import { useNavigate } from 'react-router-dom'

const Questions = () => {
  const [questions, setQuestions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectOption, setSelectOption] = useState('')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([])
  const [message, setMessage] = useState('')

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

        setTimeout(() => {
          fetchQuestions(retryCount - 1)
        }, delay)

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
      }
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  useEffect(() => {
    if (questions.length > 0) {
      const shuffled = shuffleQuestions(
        questions[currentQuestionIndex].correct_answer,
        questions[currentQuestionIndex].incorrect_answers
      )
      setShuffledOptions(shuffled)
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
    }
  }

  const handleLeaderBoardPage = () => {
    if (!selectOption) {
      setMessage('Please select an answer')
      return
    }
    navigate('/leaderboard')
    setMessage('')
  }
  return (
    <div>
      <h2>Questions</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        questions &&
        questions.length > 0 && (
          <div>
            <div>
              <p>
                {`Question ${currentQuestionIndex + 1} ${
                  questions[currentQuestionIndex].question
                }`}
              </p>
              <ul>
                {shuffledOptions.map((option, index) => (
                  <>
                    <li
                      key={index}
                      onClick={() =>
                        handleSelectOption(
                          option,
                          questions[currentQuestionIndex].correct_answer
                        )
                      }
                    >
                      {option}
                    </li>
                  </>
                ))}
              </ul>
              {currentQuestionIndex === questions.length - 1 ? (
                <Button title='Submit Quiz' onClick={handleLeaderBoardPage} />
              ) : (
                <Button title='Next Question' onClick={handleNextQuestion} />
              )}

              {selectOption ? (
                <p>{`You have selected ${selectOption}`}</p>
              ) : (
                message && <p>{message}</p>
              )}
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default Questions
