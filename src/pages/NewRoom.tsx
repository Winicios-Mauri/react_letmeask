import illustrationsImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../componets/Button';

import '../styles/auth.scss';

export function NewRoom(){
  return(
    <div id='page-auth'>
      <aside>
        <img src={illustrationsImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire suas dúvidas em tempo real</p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <div className="separator">ou entre em outra sala</div>
          <form>
            <input type="text" placeholder="Nome da Sala" />
            <Button type="submit">Criar nova sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <a href="#">Clique aqui</a>
          </p>
        </div>
      </main>
    </div>
  )
}