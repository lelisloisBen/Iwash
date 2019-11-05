import React, { useState } from 'react';
import styles from './Rasp.module.css';
import SweetAlert from 'sweetalert-react';

const Rasp = () => {

    const [show, setShow] = useState(false);

    const clik = () => {

        // fetch('http://172.16.100.7:3000/iwash',{
        //     method: 'POST',
        //     body: JSON.stringify({
        //         "action": "",
        //         "msg": "WASHING"
        //     }),
        //     headers:{
        //         'Content-Type': 'application/json'
        //     }
        // })
        // .then(res => res.json())
        // .then(res => console.log(res.msg))
        // .catch(error => console.log('error: ', error) );
    }
 
    return (
        <section className={styles.section} >
            Rasp home
            <button onClick={clik} >Get from rasp</button>

            <SweetAlert
                show={show}
                title="Demo"
                text="SweetAlert in React"
                onConfirm={() => setShow(false) }
            />
        </section>
    );
};

export default Rasp;