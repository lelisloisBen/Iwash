import React from 'react';
import styles from './Wallet.module.css';

const Wallet = () => {
    return (
        <section className={styles.section}>
            <div className={["container text-center", styles.white].join(' ')}>
                <h1>Wallet</h1>
                <p>your current credit is: $40</p>
                <button className="btn btn-danger m-3" > + $10</button>
                <button className="btn btn-danger m-3" > + $20</button>
                <button className="btn btn-danger m-3" > + $30</button>
                <button className="btn btn-danger m-3" > + $40</button>
                <button className="btn btn-danger m-3" > + $50</button>
                <button className="btn btn-danger m-3" > + $60</button>
                <button className="btn btn-danger m-3" > + $70</button>
                <button className="btn btn-danger m-3" > + $80</button>
                <button className="btn btn-danger m-3" > + $90</button>
                <button className="btn btn-danger m-3" > + $100</button>
            </div>
        </section>
    );
};

export default Wallet;