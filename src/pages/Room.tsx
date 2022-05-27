import { useParams } from 'react-router-dom'

import logoImg from '../assets/images/logo.svg'

import { Button } from '../componets/Button'
import { RoomCode } from '../componets/RoomCode'

import '../styles/room.scss'

type RoomParams = {
  id: string
}

export function Room() {
  const params = useParams<RoomParams>()
  const roomId = params.id

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
          <h1>Sala de React</h1>
          <span>4 perguntas</span>
        </div>

        <form>
          <textarea placeholder="O que você deseja perguntar?" />

          <div className="form-footer">
            <span>
              Para enviar uma pergunta,{' '}
              <button id="teste">Faça seu login</button>
            </span>
            <Button type="submit">Enviar perguntas</Button>
          </div>
        </form>
      </main>
    </div>
  )
}
