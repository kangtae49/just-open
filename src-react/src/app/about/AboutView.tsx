import './AboutView.css'
import useOnload from "../../hooks/useOnload.ts";
import logo from "../../assets/just-open.svg"

export default function AboutView() {
  const {onLoad} = useOnload();

  onLoad(() => {
    console.log("onLoad")
  })

  return (
    <div className="about"
         tabIndex={0}>
      <div className="box">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="content">
          <h2>JustOpen v0.1.0</h2>
          <p>Powered by open-source software</p>
          <a href="https://github.com/kangtae49/just-open" target="_blank">Home</a>
        </div>
      </div>
    </div>
  )
}
