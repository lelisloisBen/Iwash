import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../../UserContext';
import styles from './Washers.module.css';

import washerClose from '../../../img/washing/w2.png';

const Machine = (props) => {

    let history = useHistory();

    const {washersData} = useContext(UserContext);
    const [modalVisible, setModalVisible] = useState('invisible');
    const [errorMsg, setErrorMsg] = useState('');

    const [modalCycle, setCycle] = useState('');
    const [modalPrice, setPrice] = useState('');
    const [modalTime, setTime] = useState('');

    const modalToggle = (cycle, price, time) => {
        setCycle(modalCycle ? "" : cycle);
        setPrice(modalPrice ? "" : price);
        setTime(modalTime ? "" : time);
        setModalVisible(modalVisible === 'invisible' ? 'visible' : 'invisible');
    }

    const startMachine = (cycle, price, time) => {
        console.log(cycle);
        let machineId = washersData[WasherId].id;
        let locationNum = washersData[WasherId].locationNum;
        let start_at = Date.now();
        let end_at = (Date.now() + ((Number(time)*60)*1000))

        let washingNow = JSON.stringify({
            machineId: machineId,
            locationNum: locationNum,
            price: price,
            cicle: cycle,
            time: time,
            start_at: start_at,
            end_at: end_at
        })
        
        modalToggle();
        // to have the right address ip, type in rasp terminal: ifconfig wlan0
        // once you get that address, change it here and in the rasp app.py
        fetch('http://192.168.0.83:3000/iwash',{
            method: 'POST',
            body: JSON.stringify({
                "action": cycle,
                "msg": cycle+" WASHING"
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res.msg);
            if (res.msg === 'success') {
                fetch('http://0.0.0.0:3000/start_washing',{
                    method: 'POST',
                    cors: '*cors',
                    body: washingNow,
                    headers:{
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
                  .then(res => console.log(res))
                  .catch(error => console.log(error));
                console.log(washingNow);







                // history.push('/current-wash');
            } else {
                setErrorMsg('Something went wrong');
            }
        })
        .catch(error => console.log('error: ', error) );
    }

    let WasherId = props.match.params.WID;

    return (
        <section className={styles.section}>
            <div className="container text-center">
                {errorMsg ? 
                    <div className="alert alert-danger" role="alert">
                    {errorMsg}
                    </div>
                    : ''
                }
                <div className="row">
                    <div className="col">

                        <div className="card">
                            <div className="card-body">
                                <div className="card-text">
                                    <h4 className="text-center" >{washersData[WasherId].name}</h4>
                                    <div className="row">
                                        <div className="col">
                                            <span className={["badge badge-success m-1", styles.available].join(' ')}>Available</span>
                                        </div>
                                        <div className="col">
                                            <span className={["badge badge-pill badge-primary", styles.number].join(' ')}>{washersData[WasherId].number}</span>
                                        </div>
                                    </div>
                                    
                                    
                                </div>
                            </div>
                            <img src={washerClose} className="card-img-top" alt="name" />
                        </div>
                            
                    </div>
                    <div className="col">
                        <h3>Choose Your Cycle:</h3>
                        <div className="row">

                            <div 
                                onClick={() => modalToggle(washersData[WasherId].cicle_1, washersData[WasherId].price_1,washersData[WasherId].time_1)} 
                                className={["col-sm-12 col-md-5 col-lg-5 m-1", styles.btnGreen].join(' ')}
                            > 
                                {washersData[WasherId].cicle_1} 
                                <br/> 
                                &#128178; {washersData[WasherId].price_1}
                                <br/>
                                &#128336; {washersData[WasherId].time_1} min
                               
                            </div>

                            <div 
                                onClick={() => modalToggle(washersData[WasherId].cicle_2,washersData[WasherId].price_2,washersData[WasherId].time_2)} 
                                className={["col-sm-12 col-md-5 col-lg-5 m-1", styles.btnGreen].join(' ')}
                            >
                                
                                    {washersData[WasherId].cicle_2} 
                                    <br/> 
                                    &#128178; {washersData[WasherId].price_2}
                                    <br/>
                                    &#128336; {washersData[WasherId].time_2} min
                               
                            </div>

                            <div 
                                onClick={() => modalToggle(washersData[WasherId].cicle_3,washersData[WasherId].price_3,washersData[WasherId].time_3)} 
                                className={["col-sm-12 col-md-5 col-lg-5 m-1", styles.btnGreen].join(' ')}
                            >   
                                {washersData[WasherId].cicle_3} 
                                <br/> 
                                &#128178; {washersData[WasherId].price_3}
                                <br/>
                                &#128336; {washersData[WasherId].time_3} min
                            </div>

                            <div 
                                onClick={() => modalToggle(washersData[WasherId].cicle_4,washersData[WasherId].price_4,washersData[WasherId].time_4)} 
                                className={["col-sm-12 col-md-5 col-lg-5 m-1", styles.btnGreen].join(' ')}
                            > 
                                {washersData[WasherId].cicle_4} 
                                <br/> 
                                &#128178; {washersData[WasherId].price_4}
                                <br/>
                                &#128336; {washersData[WasherId].time_4} min
                            </div>

                            <div 
                                onClick={() => modalToggle(washersData[WasherId].cicle_5,washersData[WasherId].price_5,washersData[WasherId].time_5)} 
                                className={["col-sm-12 col-md-5 col-lg-5 m-1", styles.btnGreen].join(' ')}
                            >
                                {washersData[WasherId].cicle_5} 
                                <br/> 
                                &#128178; {washersData[WasherId].price_5}
                                <br/>
                                &#128336; {washersData[WasherId].time_5} min
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* MODAL CONFIRMATION */}
            <div className={["modal", modalVisible].join(' ')}>
                <div className="modal-content">
                    <span onClick={modalToggle} className="close">&times;</span>
                    <h1>{washersData[WasherId].name} Number: {washersData[WasherId].number}</h1>
                    <h2>{modalCycle}</h2>
                    <h2>{modalPrice}</h2>
                    <h2>{modalTime}</h2>
                    <p>1 - put your clothes inside the washing machine</p>
                    <p>2 - insert detergent / softener</p>
                    <p>3 - make sure the door is closed</p>
                    <h3>Are you ready to start?</h3>
                    <div className="row">
                        <div className="col">
                            <button 
                                onClick={modalToggle} 
                                className="btn btn-danger"
                            >
                                NO, CANCEL
                            </button>
                        </div>
                        <div className="col text-right">
                            <button 
                                onClick={() => startMachine(modalCycle, modalPrice, modalTime)} 
                                className="btn btn-success"
                            >
                                YES, START
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            

        </section>
    );
};

export default Machine;