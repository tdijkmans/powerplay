import './App.css'
import GameScore from './components/GameScore/GameScore'
import UsaList from './components/UsaList/UsaList'
import UsaMap from './components/UsaMap/UsaMap'
import UsaStateInfo from './components/UsaStateInfo/UsaStateInfo'
import ZoomControl from './components/ZoomControl/ZoomControl'

function App() {

  return (
    <div className="powerplay-container">
      <div className="div1">
        <ZoomControl />
        <UsaStateInfo />   </div>
      <div className="div2"></div>
      <div className="div3"></div>
      <div className="div4">4</div>
      <div className="div5"><UsaMap /></div>
      <div className="div6">
      </div>

      <div className="div7"> 7

      </div>
      <div className="div8"></div>
      <div className="div9"><GameScore /></div>

      <div className="div10">
        <UsaList />
      </div>
    </div>
  )
}

export default App
