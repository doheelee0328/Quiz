import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Questions = () => {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)

  const selectedCategory = useSelector(
    (state: any) => state.questionSlice.selectedCategory
  )
  const difficulty = useSelector(
    (state: any) => state.questionSlice.selectedDifficulty
  )

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
    // what
  }, [])

  return (
    <div>
      <h2>Questions</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        questions &&
        questions.length > 0 && (
          <div>
            {questions.map((question: any, index: number) => (
              <div key={index}>
                <p>
                  Question {index + 1}: {question.question}
                </p>
                <ul>
                  <li>{question.correct_answer}</li>
                  {question.incorrect_answers.map(
                    (question: any, index: number) => (
                      <li key={index}>{question}</li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  )
}

export default Questions
