import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import illustrationsImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import { Button } from '../componets/Button'

import '../styles/auth.scss'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

export function NewRoom() {
  const { user } = useAuth()
  const navegue = useNavigate()
  const [newRoom, setNewRoom] = useState('')

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault()

    if (newRoom.trim() === '') {
      return
    }
    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authId: user?.id
    })

    navegue(`/rooms/${firebaseRoom.key}`)
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationsImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire suas dúvidas em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <div className="separator">ou entre em outra sala</div>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da Sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar nova sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}
