import { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import logoImg from '../assets/images/logo.svg'

import { Button } from '../componets/Button'
import { RoomCode } from '../componets/RoomCode'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

import '../styles/room.scss'

type FirebaseQuestion = Record<
  string,
  {
    author: {
      name: string
      avatar: string
    }
    content: string
    isHighlighted: boolean
    isAnswered: boolean
  }
>

type Question = {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  isHighlighted: boolean
  isAnswered: boolean
}

type RoomParams = {
  id: string
}

export function Room() {
  const { user } = useAuth()
  const params = useParams<RoomParams>()
  const [newQuestion, setNewQuestion] = useState('')
  const [questions, setQuestion] = useState<Question[]>([])
  const [title, setTitle] = useState('')

  const roomId = params.id

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)

    roomRef.on('value', room => {
      const databaseRoom = room.val()
      const firebaseQuestion: FirebaseQuestion = databaseRoom.questions ?? {}

      const parsedQuestion = Object.entries(firebaseQuestion).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered
          }
        }
      )
      setTitle(databaseRoom.title)
      setQuestion(parsedQuestion)
    })
  }, [roomId])

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault()

    if (newQuestion.trim() === '') {
      return
    }
    if (!user) {
      throw new Error('Erro ao logar')
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false
    }

    await database.ref(`rooms/${roomId}/questions`).push(question)

    setNewQuestion('')
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code="" roomCode={roomId} />
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você deseja perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta,{' '}
                <button id="teste">Faça seu login</button>
              </span>
            )}
            <Button type="submit" disabled={!user}>
              Enviar perguntas
            </Button>
          </div>
        </form>

        {JSON.stringify(questions)}
      </main>
    </div>
  )
}
