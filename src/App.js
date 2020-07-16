import React from 'react';



class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            sesLength: 25,
            breakLength: 5,
            sesMin: 25,
            sesSec: 0,
            session: true,
            run: true
        }
        this.handleClick = this.handleClick.bind(this)
        this.getSeconds = this.getSeconds.bind(this)
        this.count = this.count.bind(this)
        this.startTimer = this.startTimer.bind(this)
    }
    
    getSeconds(mins, secs) {
        const seconds = (mins * 60) + secs
        return seconds
    }

    count() {
        if(this.state.sesMin === 0 && this.state.sesSec === 0){
            const audio = document.getElementById("beep")
            audio.play()
            if (this.state.session === true){
                this.setState({
                    sesMin: this.state.breakLength,
                    sesSec: 1,
                    session: false
                })
            }else {
                this.setState({
                    sesMin: this.state.sesLength,
                    sesSec: 1,
                    session: true
                })
            }
        }
        const secondsLeft = this.getSeconds(this.state.sesMin, this.state.sesSec) -1
        this.setState({
            sesMin: Math.floor(secondsLeft / 60),
            sesSec: secondsLeft % 60
        })
    }

    startTimer(){
        this.interval = setInterval(this.count, 1000)
    } 

    handleClick(event){
        const { sesLength, breakLength} = this.state;
        const { id } = event.target;
        
        
            if(id === "session-increment" && sesLength < 60){
                this.setState({
                    sesLength: sesLength + 1,
                    sesMin: sesLength + 1
                })
            }else if (id === "session-decrement" && sesLength > 1){
                this.setState({
                    sesLength: sesLength - 1,
                    sesMin: sesLength - 1
                })
            }else if (id === "break-increment" && breakLength < 60){
                this.setState({
                    breakLength: breakLength + 1
                })
            }else if (id === "break-decrement" && breakLength > 1){
                this.setState({
                    breakLength: breakLength - 1
                })
            }else {
                switch(id){
                    case "reset":
                        clearInterval(this.interval)
                        this.setState({
                            sesLength: 25,
                            breakLength: 5,
                            sesMin: 25,
                            sesSec: 0,
                            session: true,
                            run: true
                        })
                        const audio = document.getElementById("beep")
                        audio.pause()
                        audio.currentTime = 0
                        
                        break
                    default:
                        if (this.state.run === true){
                            this.startTimer()
                            this.setState({
                                run: false
                            })
                        }else{
                            clearInterval(this.interval)
                            this.setState({
                                run: true
                            })
                        }
                }
            }
        
    }

    render() {

        const containerStyle = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgb(0, 0, 0, 0.1)",
            minHeight: "100vh"
        }

        const clockStyle = {
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            backgroundColor: "rgb(0, 0, 0, 0.2)",
            height: 500,
            width: 500,
            borderRadius: 10
        }

        const headerStyle= {
            gridColumn: "1 / 5",
            textAlign: "center",
            fontSize: 50,
            height: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }

        const breakStyle= {
            gridColumn: "1 / 3",
            textAlign: "center",
            fontSize: 20,
            height: 100
        }

        const sessionStyle= {
            gridColumn: "3 / 5",
            textAlign: "center",
            fontSize: 20,
            height: 100
        }

        const displayStyle= {
            gridColumn: "1 / 5",
            gridRow: "3 / 5",
            textAlign: "center",
            fontSize: 40,
            height: 200
        }

        const controlStyle= {
            gridColumn: "1 / 5",
            textAlign: "center",
            height: 100
        }

        const pStyle = {
            display: "inline",
            fontSize: 30,
            paddingLeft: 10,
            paddingRight: 10
        }

        return(
            <div className="container" style={containerStyle}>
                <div className="clock" style={clockStyle}>
                    <div className="Header" style={headerStyle}>
                        <p>Pomodoro clock</p>
                    </div>
                    <div className="breakLength" id="break-label" style={breakStyle}>
                        <br />Break Length<br />
                        <button onClick={this.handleClick} id="break-decrement">-</button>
                        <p style={pStyle} id="break-length">{this.state.breakLength}</p>
                        <button onClick={this.handleClick} id="break-increment">+</button>
                    </div>
                    <div className="sessionLength" id="session-label" style={sessionStyle}>
                        <br />Session Length<br />
                        <button onClick={this.handleClick} id="session-decrement">-</button>
                        <p style={pStyle} id="session-length">{this.state.sesLength}</p>
                        <button onClick={this.handleClick} id="session-increment">+</button>
                    </div>
                    <div className="sessionDisplay" style={displayStyle} id="timer-label">
                        <br />{this.state.session === true ? "Session": "Break"}
                        <div style={{fontSize: 70}} id="time-left">
                        {this.state.sesMin < 10 ?"0"+this.state.sesMin:this.state.sesMin}:{this.state.sesSec < 10 ?"0"+this.state.sesSec:this.state.sesSec}
                        </div>
                    </div>
                    <div className="controlButtons" style={controlStyle}>
                        <br />
                        <br />
                        <button id="start_stop" onClick={this.handleClick}>Play/Pause</button>
                        <button id="reset" onClick={this.handleClick}>Reset</button>
                        <audio className="clip" src="https://onlineclock.net/audio/options/default.mp3" id="beep"></audio>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
