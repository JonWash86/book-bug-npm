import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import fire from '../fire.js'

function Login(props){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newAccount, setAccountStatus] = useState(false);
  const [pwFeedback, setPwFeedback] = useState(null);

  // State for new password validation
  const [lowercaseValid, setLowercaseValid] = useState(false);
  const [uppercaseValid, setUppercaseValid] = useState(false);
  const [numberValid, setNumbersValid] = useState(false);
  const [lengthValid, setLengthValid] = useState(false);
  // All new password fields are valid
  const [allValid, setAllValid] = useState(false);

  var passwordValid = true;

  const openRegistration = () => {
    setAccountStatus(true);
  }

  const closeRegistration = () => {
    setAccountStatus(false);
  }

  const passwordChanged = () => {
    if (password)
    {
      validatePassword(password);
    }
  }

  const showFeedback = () => {
    document.getElementById('pwFeedback').style.display = 'block';
  }

  const hideFeedback = () => {
    document.getElementById('pwFeedback').style.display = 'none';
  }

  const validatePassword = (password) => {
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    password.match(lowerCaseLetters) ? setLowercaseValid(true) : setLowercaseValid(false);

    // Validate uppercase lowercase letters
    var upperCaseLetters = /[A-Z]/g;
    password.match(upperCaseLetters) ? setUppercaseValid(true) : setUppercaseValid(false);

    // Validate number
    var numbers = /[0-9]/g;
    password.match(numbers) ? setNumbersValid(true) : setNumbersValid(false);

    // Validate password length
    password.length >= 8 ? setLengthValid(true) : setLengthValid(false);

    // Determine whether all parameters are valid
    if (lowercaseValid && uppercaseValid && numberValid && lengthValid && (password === confirmPassword)){
      setAllValid(true);
      hideFeedback();
    } else
    {
      document.getElementById('newPwFeedback').style.display = 'block';
      setAllValid(false);
    }
  }

  // Provide specific feedback for invalid passwords
  const generatePwFeedback = () => {
    if (newAccount && (password != confirmPassword)){
      setAllValid(false);
      setPwFeedback('Passwords are not matching.');
      showFeedback();
    }
    else if (password == '' || email == '')
    {
      setPwFeedback('Please enter an email address and password.');
      showFeedback();
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    generatePwFeedback();

    if (newAccount && allValid)
    {
      document.getElementById('newPwFeedback').style.display = 'none';
      fire.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
        if (error.message = 'EMAIL_EXISTS')
        {
          setPwFeedback('An account using this email already exists.')
          showFeedback();
        }
        console.error('Problem creating user');
      });
    } else if (!newAccount && allValid){
      console.log(`submitted email: ${email} password: ${password}`);
      fire.auth().signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.error('Incorrect username or password');
        setPwFeedback('Incorrect username or password');
      });
    }
  }


return(
    <div id='loginModal'>
      <h1>Please log in</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email:</p>
          <input
          type='text'
          onChange={({ target }) =>
          setEmail(target.value)}
          placeholder='Email'
          />
        </label>
        <label>
          <p>Password:</p>
          <input
            id='enterPassword'
            type='password'
            onChange={({ target }) =>
            setPassword(target.value)}
            onKeyUp={passwordChanged}
            placeholder='Password'
          />
        </label>
        {newAccount &&
          <label>
            <p>Confirm Password:</p>
            <input
              id='confirmPassword'
              type='password'
              onChange={({ target }) =>
              setConfirmPassword(target.value)}
              placeholder='Confirm Password'
            />
          </label>
        }
        <div id='loginSubmit'>
            <button type='submit'>Submit</button>
        {!newAccount &&
          <div>
            No account? <Link onClick={openRegistration}>Sign up here</Link>.
          </div>
        }
        {newAccount &&
          <div>
            Existing member? <Link onClick ={closeRegistration}>Log in here</Link>.
          </div>
        }
        </div>
      </form>
        <div id='pwFeedback'>
          <p className='invalid'>
            {pwFeedback}
          </p>
          { newAccount &&
            <p id='newPwFeedback'>Password needs <a className={uppercaseValid == true ? 'valid' :'invalid'}>one uppercase letter</a>, <a className={lowercaseValid == true ? 'valid' :'invalid'}>one lowercase letter</a>, <a className={numberValid == true ? 'valid' :'invalid'}>one number</a>, and <a className={lengthValid == true ? 'valid' :'invalid'}>must be at least eight characters long</a>.</p>
          }
        </div>
    </div>
  )
}

export default Login;
