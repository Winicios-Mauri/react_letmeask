import { FormEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'

import { Button } from '../componets/Button'
import { RoomCode } from '../componets/RoomCode'
import { useRoom } from '../hooks/useRoom'

import '../styles/room.scss'
import { Question } from './Question'
import { database } from '../services/firebase'

type RoomParams = {
  id: string
}

export function AdminRoom() {
  // const { user } = useAuth()
  const navegue = useNavigate()
  const params = useParams<RoomParams>()
  const roomId = params.id as any

  const { title, questions } = useRoom(roomId)

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    })

    navegue('/')
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Deseja remover este registro')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code="" roomCode={roomId} />
            <Button onClick={handleEndRoom} isOutlined>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              >
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            )
          })}
        </div>
      </main>
    </div>
  )
}
