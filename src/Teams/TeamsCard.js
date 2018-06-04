import React, { Component } from 'react';
import { Tab,Tabs } from 'react-bootstrap';

class TeamsCard extends Component {

    constructor(props) {
        super()
        this.state = {
            "teams": [{
                "team": "Greater kudu",
                "image": "https://robohash.org/estrepellendusdoloremque.png?size=100x100&set=set1",
                "players": [{
                    "name": "Cloe Plover",
                    "image": "https://robohash.org/blanditiisquibeatae.png?size=100x100&set=set1",
                    "location": "Kore"
                }, {
                    "name": "Celinka Pidgeley",
                    "image": "https://robohash.org/temporaestnesciunt.png?size=100x100&set=set1",
                    "location": "Valle de Ángeles"
                }, {
                    "name": "Marven Clive",
                    "image": "https://robohash.org/voluptatumminimaeum.png?size=100x100&set=set1",
                    "location": "Vryburg"
                }, {
                    "name": "Julienne Micheli",
                    "image": "https://robohash.org/mollitiavoluptatibusoptio.png?size=100x100&set=set1",
                    "location": "Rosário do Sul"
                }, {
                    "name": "Garvey Coiley",
                    "image": "https://robohash.org/eacommodinatus.png?size=100x100&set=set1",
                    "location": "Norsborg"
                }]

            }, {
                "team": "Black-faced kangaroo",
                "image": "https://robohash.org/eosautemlaudantium.png?size=100x100&set=set1",
                "players": [{
                    "name": "Doe Wimmer",
                    "image": "https://robohash.org/explicabovelitqui.png?size=100x100&set=set1",
                    "location": "Guozhai"
                }, {
                    "name": "Debby Overpool",
                    "image": "https://robohash.org/ipsamdoloremrepellendus.png?size=100x100&set=set1",
                    "location": "Novo Hamburgo"
                }, {
                    "name": "Allissa Flemyng",
                    "image": "https://robohash.org/rerumrerumdolorum.png?size=100x100&set=set1",
                    "location": "Alençon"
                }, {
                    "name": "Nona Langforth",
                    "image": "https://robohash.org/nesciuntquosaepe.png?size=100x100&set=set1",
                    "location": "Ulricehamn"
                }, {
                    "name": "Prescott Mathevon",
                    "image": "https://robohash.org/quidemsequidolorum.png?size=100x100&set=set1",
                    "location": "María la Baja"
                }]
            }, {
                "team": "Goldeneye, common",
                "image": "https://robohash.org/eaetnobis.png?size=100x100&set=set1",
                "players": [{
                    "name": "Hephzibah Foy",
                    "image": "https://robohash.org/itaqueomniseaque.png?size=100x100&set=set1",
                    "location": "Ketian"
                }, {
                    "name": "Gillan Villiers",
                    "image": "https://robohash.org/sitatqueut.png?size=100x100&set=set1",
                    "location": "Mhlume"
                }, {
                    "name": "Karolina Lukianov",
                    "image": "https://robohash.org/dignissimosinventorenecessitatibus.png?size=100x100&set=set1",
                    "location": "Qīr Moāv"
                }, {
                    "name": "Guillermo Lounds",
                    "image": "https://robohash.org/nisiautillo.png?size=100x100&set=set1",
                    "location": "Momignies"
                }, {
                    "name": "Kellie Hargate",
                    "image": "https://robohash.org/necessitatibussuntenim.png?size=100x100&set=set1",
                    "location": "Burns Lake"
                }]
            }, {
                "team": "Golden-mantled ground squirrel",
                "image": "https://robohash.org/istedebitisvoluptas.png?size=100x100&set=set1",
                "players": [{
                    "name": "Binny Walden",
                    "image": "https://robohash.org/adipisciquastemporibus.png?size=100x100&set=set1",
                    "location": "Pertunmaa"
                }, {
                    "name": "Vittorio Darlaston",
                    "image": "https://robohash.org/rerumabnon.png?size=100x100&set=set1",
                    "location": "Poniatowa"
                }, {
                    "name": "Zachery Quan",
                    "image": "https://robohash.org/quisquamestsint.png?size=100x100&set=set1",
                    "location": "Guanshan"
                }, {
                    "name": "Luz Titterrell",
                    "image": "https://robohash.org/providentfacilisquia.png?size=100x100&set=set1",
                    "location": "Kertosari"
                }, {
                    "name": "Olivier Hubbert",
                    "image": "https://robohash.org/officiasitsint.png?size=100x100&set=set1",
                    "location": "Khursā"
                }]
            }, {
                "team": "Small-spotted genet",
                "image": "https://robohash.org/fugaipsaet.png?size=100x100&set=set1",
                "players": [{
                    "name": "Baryram Perotti",
                    "image": "https://robohash.org/facilisenimnobis.png?size=100x100&set=set1",
                    "location": "Sindangkerta"
                }, {
                    "name": "Peirce Bwy",
                    "image": "https://robohash.org/voluptatibustemporibusblanditiis.png?size=100x100&set=set1",
                    "location": "Thessalon"
                }, {
                    "name": "Randie Case",
                    "image": "https://robohash.org/perferendismaioresdolores.png?size=100x100&set=set1",
                    "location": "Tuqiao"
                }, {
                    "name": "Marlena Benez",
                    "image": "https://robohash.org/utquiiusto.png?size=100x100&set=set1",
                    "location": "Leskovac"
                }, {
                    "name": "Pierette Pressland",
                    "image": "https://robohash.org/quiquaeratet.png?size=100x100&set=set1",
                    "location": "Mont-Saint-Hilaire"
                }]
            }]
        }
    }

    render() {
        return (
            <Tabs defaultActiveKey={1}>
            {this.state.teams.map((t,index) =>
                <Tab eventKey={index+1} title={t.team}>
                    <h1>{t.team}</h1>
                    <h2>Players</h2>
                    <table>
                        <tr>
                            <td>
                                {t.players.map(p =>
                                    <div>
                                     <img src={p.image}/>
                                     {p.name}
                                    </div>)}
                            </td>
                        </tr>
                    </table>
                <br/><br/>
                </Tab>
            )}
            </Tabs>);
    }
}

export default TeamsCard;
