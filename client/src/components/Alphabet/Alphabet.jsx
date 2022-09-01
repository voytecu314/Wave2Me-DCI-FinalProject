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
import SPACE from '../../assets/ASLalphabet/empty.png';
import './Alphabet.css'

const Alphabet = () => {

    const alphabet = {
        A: A, B: B, C: C, D: D, E: E, F: F, G: G, H: H, I: I, J: J, K: K, L: L, M: M, 
        N: N, O: O, P: P, Q: Q, R: R, S: S, T: T, U: U, V: V, W: W, X: X, Y: Y, Z: Z,
        SPACE: SPACE
    }

    const startSentence = [ <span>L</span>,<span>i</span>,<span>s</span>,<span>t</span>,<span>e</span>,<span>n</span>,
                            <span style={{flexBasis:'3%'}}></span>,<span>t</span>,<span>o</span>,<span style={{flexBasis:'3%'}}></span>,
                            <span>m</span>,<span>y</span>,<span style={{flexBasis:'3%'}}></span>,<span>h</span>,<span>a</span>,<span>n</span>,
                            <span>d</span>,<span>s</span>,]

    const [inputValue, setInputValue] = useState(startSentence);
    const [ASLalphabet, setASLalphabet] = useState(null);
    const [letter, setLetter] = useState(alphabet['SPACE']);
    const [displayLetter, setDisplayLetter] = useState(null);
    const [displayPlayBtn, setDisplayPlayBtn] = useState(true);
    const [displayModal, setDisplayModal] = useState(false);

    const write = (e) => { 
        if(e.target.value[e.target.value.length-1]!==' ' && !isNaN(+e.target.value[e.target.value.length-1])){
            e.target.value=e.target.value.slice(0, -1);
        }
        const inputText = e.target.value.split('');
        const letterSpans = inputText.map(letter=>{if(letter===' ')
                                                    return <span style={{flexBasis:'3%'}}></span>
                                                      else if(!letter.match(/[a-z]/i))
                                                        return <span></span>
                                                          else return <span>{letter}</span>})
        
        setInputValue(letterSpans);
        //if(e.target.value && e.target.value[e.target.value.length-1].match(/[a-z]/i)) 
        //setLetter(alphabet[e.target.value[e.target.value.length-1].toUpperCase()]);
    }

    const play = (e) => {
        setLetter(alphabet['SPACE']);
        setDisplayLetter(null);
        setDisplayModal(true);
        setDisplayPlayBtn(false);
        const letters = inputValue.map(obj=>{if(obj?.props?.children) return obj.props.children
                                                else return 'SPACE'});
        let i =-1;
        const playAlphabet = setInterval(()=>{ if(i<letters.length-1){
            inputValue[++i]?.props?.children &&
            setLetter(alphabet[letters[i].toUpperCase()]);
            setDisplayLetter(letters[i]!=='SPACE'?letters[i].toUpperCase():'-')}
            else {clearInterval(playAlphabet); setDisplayPlayBtn(true)}
        },1000);
    }

    const closeModal = (e) => {
        setDisplayModal(false);
    }

    useEffect(()=>{
        const inputText=inputValue.map(span=>{if(span.props.children) return span.props.children; else return '-'});
        
        const inputImages=inputText.map(letter=>{ if(letter && letter.match(/[a-z]/i)){
                                                    return (<img src={alphabet[letter.toUpperCase()]} 
                                                        alt={`ASL letter ${letter}`}
                                                        width="10%"
                                                        height="13%"></img>)
                                                     } else if(letter && letter==='-')
                                                       return <img 
                                                                src={alphabet.SPACE} 
                                                                alt='Empty space character'
                                                                width="10%"
                                                                height="13%"></img>
                                        })
        setASLalphabet(inputImages);
        /* inputValue[0]?.props?.children && 
        inputValue[0]?.props?.children.match(/[a-z]/i) &&
        setLetter(alphabet[inputValue[0].props.children.toUpperCase()]); */
    },[inputValue]);
    

  return (
    <div id='alphabet-container'>
        <p style={{color: 'black', fontSize:'3rem'}}>Insert a phrase to generate ASL alphabet</p>
        <input 
            type="text" 
            placeholder='Insert a phrase to generate ASL alphabet'
            title='Max 40 characters - only LETTERS from English alphabet will be translated' 
            onChange={write}
            maxLength='40'
            autoFocus/>
        <br />   
        <section id='translate-section'>
            <div id='asl-alphabet-generator' className='asl-translate'>{ASLalphabet}</div>
            <div id='asl-text' className='asl-translate'>{inputValue}</div>
        </section>

        {displayPlayBtn && <button onClick={play}><i className="fa fa-play"></i></button>}
        
        {displayModal &&
        <div id='play-asl-modal'>
            <button id='close-asl-modal' onClick={closeModal}>X</button>
            <img src={letter} alt={`ASL letter ${letter}` } width={'35%'} height={'55%'}/>
            <h1 style={{color: 'black', fontSize:'7rem', flexBasis:'7rem'}}>{displayLetter}</h1>
            {displayPlayBtn && <button onClick={play}>Play again</button>}
        </div>}
    </div>
  )
}

export default Alphabet;
