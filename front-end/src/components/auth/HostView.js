import React from 'react';
import {NavBar} from "../Navbar";
import {getPartyId, getUsername} from "../../AppUtils";

const axios = require('axios').default;

export class HostView extends React.Component {

    render() {
        return (
            <div>
                <NavBar/>
                <section className="hero is-fullheight is-mobile has-background-dark">
                    <div className="container has-text-centered" style={{marginTop: 5 + 'vh'}}>
                        <p className="has-text-light is-size-2">New Game</p>
                        <form>
                            <label className="has-text-light">
                                Base Pack
                                <input type="checkbox" id="basepack"/>
                            </label>
                            <br/>
                            <label className="has-text-light">
                                NSFW Pack
                                <input type="checkbox" id="nsfwpack"/>
                            </label>
                            <br/>
                            <label className="has-text-light">
                                Com Sci Pack
                                <input type="checkbox" id="cspack"/>
                            </label>
                            <br/><br/>
                            <label className="has-text-light">
                                Max Players:
                                <select id="maxplayers">
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                </select>
                            </label>
                            <br/><br/>
                            <label className="has-text-light">
                                Score to Win:
                                <select id="scoreToWin">
                                    <option>3</option>
                                    <option>5</option>
                                    <option>7</option>
                                    <option>10</option>
                                </select>
                            </label>
                            <br/><br/>
                            <p className="has-text-light is-size-4" id="joinCode"/>
                            <br/><br/>
                        </form>
                        <div className="buttons is-centered are-medium">
                            <button className="button is-success" onClick={createParty}>Finalize</button>
                            <button className="button is-info" onClick = {Start}>Start Game</button>
                        </div>
                        <p className="has-text-light is-size-2" id="lobby"></p>
                        <div>
                           <label className="has-text-light" id="player1"></label><br/>
                           <label className="has-text-light" id="player2"></label><br/>
                           <label className="has-text-light" id="player3"></label><br/>
                           <label className="has-text-light" id="player4"></label><br/>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

const Start = () => {
    window.location = "/playerMenu"
}

/**
 * This creates a party and then sends
 * you to the party setup page.
 */
const createParty = () => {
    let username = getUsername();
    let cardPacks = []

    let maxPlayers = document.getElementById("maxplayers")
    let scoreToWin = document.getElementById("scoreToWin")
    maxPlayers = parseInt(maxPlayers.options[maxPlayers.selectedIndex].text);
    scoreToWin = parseInt(scoreToWin.options[scoreToWin.selectedIndex].text);

    if (document.getElementById("basepack").checked) cardPacks.push(0)
    if (document.getElementById("nsfwpack").checked) cardPacks.push(1)
    if (document.getElementById("cspack").checked) cardPacks.push(2)

    // Make sure that if there are no packs, at least have the base pack.
    if (cardPacks.length === 0) {
        cardPacks.push(0)
    }

    let data = {
        username: username,
        cardPacks: cardPacks,
        maxPlayers: maxPlayers,
        scoreToWin: scoreToWin
    };

    if (username.toString()) {
        axios.post("http://localhost:8080/parties/create",
            data,
            {headers: {"Content-Type": "application/json"}}
        ).then((response) => {
            console.log(response.data)
            if (response.status === 200) {
                document.cookie = "joinCode=" + response.data;
                // window.location = "/hostview"
                document.getElementById("joinCode").innerText = "Join Code: " + getPartyId();

                document.getElementById("lobby").innerText = "Players in Lobby:";
                document.getElementById("player1").innerText = "Big Jed";
                document.getElementById("player2").innerText = "Owen Boi";
                document.getElementById("player3").innerText = "Jack Nerd";
                document.getElementById("player4").innerText = "Jeff Epstein";
            }
        });
    }
}
