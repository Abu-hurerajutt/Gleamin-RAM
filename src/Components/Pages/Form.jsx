import React from 'react';
import "./Form.css"

const Form = () => {
  
  return (
    <> 
    <div className='loginform'>
    <div className="formcontainer">
      <div className="wrapper">
        <div className="card-switch">
          <label className="switch">
            <input className="toggle" type="checkbox"  />
            <span className="slider"></span>
            <span className="card-side"></span>
            <div className="flip-card__inner">
              <div className="flip-card__front">
                <div className="title">Log in</div>
                <form action="" className="flip-card__form">
                  <input type="email" placeholder="Email" name="email" required className="flip-card__input" />
                  <input type="password" placeholder="Password" required name="password" className="flip-card__input" />
                  <button className="flip-card__btn">Let`s go!</button>
                </form>
              </div>
              <div className="flip-card__back">
                <div className="title">Sign up</div>
                <form action="" className="flip-card__form">
                  <input type="text" placeholder="Name" required className="flip-card__input" />
                  <input type="email" placeholder="Email" required name="email" className="flip-card__input" />
                  <input type="password" placeholder="Password" required name="password" className="flip-card__input" />
                  <button className="flip-card__btn">Confirm!</button>
                </form>
              </div>
            </div>
          </label>
        </div>   
      </div>
      </div>
      </div>
    </>
  );
}

export default Form;
