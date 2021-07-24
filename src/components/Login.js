import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import fire from '../fire.js'

function Login(props){
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [newAccount, setAccountStatus] = useState(false);

  // State for new password validation
  const [lowercaseValid, setLowercaseValid] = useState(false);
  const [uppercaseValid, setUppercaseValid] = useState(false);
  const [numberValid, setNumbersValid] = useState(false);
  const [lengthValid, setLengthValid] = useState(false);
  // All new password fields are valid
  const [allValid, setAllValid] = useState(false);

  var passwordValid = true;

  // var passwordInput = document.getElementById('enterPassword');
  // var passwordConfirm = document.getElementById('confirmPassword');
  // var lowercaseValid = document.getElementById('lowercaseValid');
  // var uppercaseValid = document.getElementById('uppercaseValid');
  // var numberValid = document.getElementById('numberValid');
  // var lengthValid = document.getElementById('lengthValid');

  // passwordInput.onfocus = function()
  // {
  //   document.getElementById('pwFeedback').style.display = 'block';
  // }

  const openRegistration = () => {
    setAccountStatus(true);
  }

  const closeRegistration = () => {
    setAccountStatus(false);
  }

  const passwordChanged = () => {
    console.log('hi!');
    if (password)
    {
      validatePassword(password);
    }
  }

  const validatePassword = (password) => {
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    password.match(lowerCaseLetters) ? setLowercaseValid(true) : setLowercaseValid(false);
    console.log(lowercaseValid);

    // Validate uppercase lowercase letters
    var upperCaseLetters = /[A-Z]/g;
    password.match(upperCaseLetters) ? setUppercaseValid(true) : setUppercaseValid(false);
    console.log(uppercaseValid);

    // Validate number
    var numbers = /[0-9]/g;
    password.match(numbers) ? setNumbersValid(true) : setNumbersValid(false);

    // Validate password length
    password.length >= 8 ? setLengthValid(true) : setLengthValid(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newAccount)
    {
      fire.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
        console.error('Problem creating user');
      });
    } else {
      console.log(`submitted email: ${email} password: ${password}`);
      fire.auth().signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.error('Incorrect username or password');
      });
    }
  }


return(
    <div>
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
        <div>
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
          <p>
            password must include: <span id='lowercaseValid'>a lowecase letter,</span><span id='uppercaseValid'>An uppercase letter</span><span id='numberValid'>A number</span>
            and <span id='lengthValid'>Minimum 8 characters</span>
          </p>
        </div>
    </div>
  )
}

export default Login;
