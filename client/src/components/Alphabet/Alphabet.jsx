import { useState, useEffect } from 'react';
import A from '../../assets/ASLalphabet/A.png';
import B from '../../assets/ASLalphabet/B.png';
import C from '../../assets/ASLalphabet/C.png';
import D from '../../assets/ASLalphabet/D.png';
import E from '../../assets/ASLalphabet/E.png';
import F from '../../assets/ASLalphabet/F.png';
import G from '../../assets/ASLalphabet/G.png';
import H from '../../assets/ASLalphabet/H.png';
import I from '../../assets/ASLalphabet/I.png';
import J from '../../assets/ASLalphabet/J.png';
import K from '../../assets/ASLalphabet/K.png';
import L from '../../assets/ASLalphabet/L.png';
import M from '../../assets/ASLalphabet/M.png';
import N from '../../assets/ASLalphabet/N.png';
import O from '../../assets/ASLalphabet/O.png';
import P from '../../assets/ASLalphabet/P.png';
import Q from '../../assets/ASLalphabet/Q.png';
import R from '../../assets/ASLalphabet/R.png';
import S from '../../assets/ASLalphabet/S.png';
import T from '../../assets/ASLalphabet/T.png';
import U from '../../assets/ASLalphabet/U.png';
import V from '../../assets/ASLalphabet/V.png';
import W from '../../assets/ASLalphabet/W.png';
import X from '../../assets/ASLalphabet/X.png';
import Y from '../../assets/ASLalphabet/Y.png';
import Z from '../../assets/ASLalphabet/Z.png';
import './Alphabet.css'

const Alphabet = () => {

    const alphabet = {
        A: A, B: B, C: C, D: D, E: E, F: F, G: G, H: H, I: I, J: J, K: K, L: L, M: M, 
        N: N, O: O, P: P, Q: Q, R: R, S: S, T: T, U: U, V: V, W: W, X: X, Y: Y, Z: Z
    }

    //const [letter, setLetter] = useState(alphabet['D']);
    const [inputValue, setInputValue] = useState([<span></span>]);
    const [ASLalphabet, setASLalphabet] = useState(null);
    

    const write = (e) => {
        const inputText = e.target.value.split('');
        const letterSpans = inputText.map(letter=>{if(letter===' ')
                                                    return <span>{'-'}</span>
                                                      else if(!letter.match(/[a-z]/i))
                                                        return <span></span>
                                                          else return <span>{letter}</span>})
        console.log(letterSpans);
        setInputValue(letterSpans);
        //if(e.target.value && e.target.value[e.target.value.length-1].match(/[a-z]/i)) 
        //setLetter(alphabet[e.target.value[e.target.value.length-1].toUpperCase()]);
    }

    /* const play = (e) => {
        console.log(e.target.parentElement.firstChild.value.length);
        let i =0;
        const playAlphabet = setInterval(()=>{ if(i<e.target.parentElement.firstChild.value.length)
            setLetter(alphabet[e.target.parentElement.firstChild.value[i++].toUpperCase()])
            else clearInterval(playAlphabet)
        },1000);
    } */

    useEffect(()=>{
        const inputText=inputValue.map(span=>{if(span.props.children) return span.props.children; else return '-'});
        console.log(inputText);
        const inputImages=inputText.map(letter=>letter && letter.match(/[a-z]/i) &&
                                        <img src={alphabet[letter.toUpperCase()]} 
                                             alt={`ASL letter ${letter}`}
                                             width="20%"
                                             height="20%"></img>)
        setASLalphabet(inputImages);
    },[inputValue]);
    

  return (
    <div id='alphabet-container'>
        <input type="text" title='Only LETTERS from English alphabet will be translated' onChange={write} autoFocus/>
        <br />
        {/* <img src={letter} alt={`ASL letter ${letter}` } width={200} height={300}/>  */}   
        <p style={{color: 'black', fontSize:'3rem', marginTop:'5%'}}>Insert phrase to translate to ASL alphabet</p>
        <section id='translate-section'>
            <div id='asl-alphabet-generator' className='asl-translate'>{ASLalphabet}</div>
            <div className='asl-translate'>{inputValue}</div>
        </section>
        <button /* onClick={play} */><i className="fa fa-play"></i></button>
    </div>
  )
}

export default Alphabet;
